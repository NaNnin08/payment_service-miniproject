import Auth from "../helpers/AuthHelper";
import config from "../../config/config";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import formidable from "formidable";
import fs from "fs";
import path from "path";

const pathDir = __dirname + "../../../upload";

const signup = async (req, res) => {
  const { dataValues } = new req.context.models.Users(req.body);
  const salt = Auth.makeSalt();
  const hashPassword = Auth.hashPassword(dataValues.user_password, salt);

  const users = await req.context.models.Users.create({
    user_name: dataValues.user_name,
    user_email: dataValues.user_email,
    user_password: hashPassword,
    user_salt: salt,
  });

  return res.send(users);
};

const signin = async (req, res) => {
  const { user_email, user_password } = req.body;

  try {
    const users = await req.context.models.Users.findOne({
      where: { user_email: user_email },
    });

    if (!users) {
      return res.status("400").json({
        error: "Users not found",
      });
    }

    if (
      !Auth.authenticate(
        user_password,
        users.dataValues.user_password,
        users.dataValues.user_salt
      )
    ) {
      return res.status("401").send({
        error: "Email and password doesn't match",
      });
    }

    const token = jwt.sign({ _id: users.user_id }, config.jwtSecret);

    res.cookie("t", token, {
      expire: new Date() + 9999,
    });

    return res.json({
      token,
      users: {
        user_id: users.dataValues.user_id,
        user_name: users.dataValues.user_name,
        user_email: users.dataValues.user_email,
        user_type: users.dataValues.user_type,
      },
    });
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve user",
    });
  }
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    mesaage: "signed out success",
  });
};

const findAll = async (req, res) => {
  const users = await req.context.models.Users.findAll({
    attributes: { exclude: ["user_password", "user_salt"] },
  });
  return res.send(users);
};

const findOne = async (req, res) => {
  const users = await req.context.models.Users.findOne({
    where: { user_id: req.params.id },
  });
  return res.send(users);
};

const update = async (req, res) => {
  if (!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir);
  }

  const form = formidable({
    multiples: true,
    uploadDir: pathDir,
    keepExtensions: true,
  });

  form
    .on("fileBegin", (name, file) => {
      file.path = path.join(pathDir, file.name);
    })
    .parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).json({
          message: "Image tidak bisa diupload",
        });
      }

      let user = new req.context.models.Users(fields);

      if (!user.user_id) {
        user.user_id = parseInt(req.params.id);
      }

      if (files.user_avatar) {
        user.user_avatar = files.user_avatar.name;
      }

      try {
        const result = await req.context.models.Users.update(user.dataValues, {
          returning: true,
          where: { user_id: parseInt(req.params.id) },
        });
        return res.send(result);
      } catch (error) {
        res.send(error.message);
      }
    });
};

const remove = async (req, res) => {
  const { dataValues } = await req.context.models.Users.findOne({
    where: { user_id: req.params.id },
  });

  if (dataValues.user_avatar) {
    fs.unlinkSync(pathDir + "//" + dataValues.user_avatar);
  }

  req.context.models.Users.destroy({
    where: { user_id: req.params.id },
  });
  return res.send("user has been deleted");
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["sha1", "RS256", "HS256"],
});

export default {
  signup,
  signin,
  signout,
  findAll,
  findOne,
  update,
  remove,
  requireSignin,
};
