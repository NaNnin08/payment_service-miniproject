import Auth from "../helpers/AuthHelper";
import config from "../../config/config";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

const pathDir = process.cwd() + "/uploads";

const signup = async (req, res, next) => {
  const { dataValues } = new req.context.models.Users(req.body);
  const salt = Auth.makeSalt();
  const hashPassword = Auth.hashPassword(dataValues.user_password, salt);
  const id = nanoid(16);

  dataValues.user_password = hashPassword;
  dataValues.user_salt = salt;
  dataValues.user_id = id;

  try {
    const users = await req.context.models.Users.create(dataValues);

    req.user_id = users.user_id;

    next();
  } catch (err) {
    console.log(err);
  }
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

const findOneEmail = async (req, res) => {
  try {
    const users = await req.context.models.Users.findOne({
      where: { user_email: req.params.id },
      attributes: ["user_email", "user_id", "user_avatar"],
    });

    if (users) {
      return res.send(users);
    } else {
      return res.status(404).send({ message: "email not found" });
    }
  } catch (err) {
    return res.send(err.message);
  }
};

const findOneEmailTransferWallet = async (req, res, next) => {
  if (req.amountFromEmail) {
    const { to_email } = req.body;
    try {
      const { dataValues } = await req.context.models.Users.findOne({
        where: { user_email: to_email },
        include: [
          {
            all: true,
          },
        ],
      });

      req.amountToEmail = dataValues;

      next();
    } catch (err) {
      return res.send(err.message);
    }
  } else {
    const { from_email } = req.body;
    try {
      const { dataValues } = await req.context.models.Users.findOne({
        where: { user_email: from_email },
        include: [
          {
            all: true,
          },
        ],
      });

      req.amountFromEmail = dataValues;

      next();
    } catch (err) {
      return res.send(err.message);
    }
  }
};

const findOne = async (req, res) => {
  if (req.params.id) {
    const users = await req.context.models.Users.findOne({
      where: { user_id: req.params.id },
      include: [
        {
          all: true,
        },
      ],
    });
    return res.send(users);
  } else {
    const user_id = req.user_id;
    const users = await req.context.models.Users.findOne({
      where: { user_id: user_id },
      include: [
        {
          all: true,
        },
      ],
    });
    return res.send(users);
  }
};

const update = async (req, res, next) => {
  const { dataValues } = await req.context.models.Users.findOne({
    where: { user_id: req.params.id },
  });

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
      file.name = name + "_" + new Date().getMilliseconds() + "_" + file.name;
      file.path = path.join(pathDir, file.name);

      if (dataValues.user_avatar) {
        fs.unlinkSync(pathDir + "//" + dataValues.user_avatar);
      }
    })
    .parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).json({
          message: "Image tidak bisa diupload",
        });
      }

      let user = new req.context.models.Users(fields);

      if (user.user_password) {
        user.user_salt = Auth.makeSalt();
        user.user_password = Auth.hashPassword(
          user.user_password,
          user.user_salt
        );
      }

      if (!user.user_id) {
        user.user_id = req.params.id;
      }

      if (files.user_avatar) {
        user.user_avatar = files.user_avatar.name;
      }

      try {
        const result = await req.context.models.Users.update(user.dataValues, {
          returning: true,
          where: { user_id: req.params.id },
        });

        if (result[0]) {
          next();
        } else {
          return res.send("Update Failed");
        }
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

const photo = async (req, res) => {
  const fileName = `${pathDir}/${req.params.filename}`;

  if (req.params.filename !== "null") {
    res.set("Content-Type", "image/jpeg");
    return res.download(fileName);
  }
};

export default {
  signup,
  signin,
  signout,
  photo,
  findAll,
  findOne,
  findOneEmail,
  findOneEmailTransferWallet,
  update,
  remove,
  requireSignin,
};
