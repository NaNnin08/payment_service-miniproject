const create = async (req, res, next) => {
  const user_id = req.user_id;

  try {
    const paac = await req.context.models.Payment_Account.create({
      pacc_saldo: 0,
      pacc_user_id: user_id,
    });

    req.user_id = user_id;

    next();
  } catch (err) {
    console.log(err);
  }
};

//findAll = select * from regions
const findAll = async (req, res) => {
  const paac = await req.context.models.Payment_Account.findAll();

  if (paac) {
    return res.send(paac);
  } else {
    return res.send("data has not found");
  }
};

//find by id
const findOne = async (req, res, next) => {
  if (req.params.id) {
    const paac = await req.context.models.Payment_Account.findOne({
      where: { paac_account_number: req.params.id },
      include: [
        {
          all: true,
        },
      ],
    });

    if (paac) {
      return res.send(paac);
    } else {
      return res.send("data has not found");
    }
  } else {
    const { dataValues } = req.data;

    const paac = await req.context.models.Payment_Account.findOne({
      where: { paac_account_number: dataValues.payt_paac_account_number },
    });

    req.data = {
      dataValues: dataValues,
      paac: paac,
    };

    next();
  }
};

// create update
const update = async (req, res) => {
  const { dataValues } = new req.context.models.Payment_Account(req.body);

  const paac = await req.context.models.Payment_Account.update(dataValues, {
    returning: true,
    where: { paac_account_number: req.params.id },
  });
  return res.send(paac);
};

//delete
const remove = async (req, res) => {
  const paac = await req.context.models.Payment_Account.destroy({
    where: { paac_account_number: req.params.id },
  });
  return res.send("data has been delete");
};

const topup = async (req, res, next) => {
  const { dataValues, paac } = req.data;

  try {
    await req.context.models.Payment_Account.update(
      {
        pacc_saldo: parseInt(paac.pacc_saldo) + parseInt(dataValues.payt_dabet),
      },
      {
        returning: true,
        where: { paac_account_number: dataValues.payt_paac_account_number },
      }
    );

    req.data = {
      dataValues: dataValues,
    };

    next();
  } catch (err) {
    console.log(err);
  }
};

const order = async (req, res, next) => {
  const { dataValues, paac } = req.data;

  if (parseInt(paac.pacc_saldo) > parseInt(dataValues.payt_credit)) {
    try {
      await req.context.models.Payment_Account.update(
        {
          pacc_saldo:
            parseInt(paac.pacc_saldo) - parseInt(dataValues.payt_credit),
        },
        {
          returning: true,
          where: { paac_account_number: dataValues.payt_paac_account_number },
        }
      );

      req.data = {
        dataValues: dataValues,
      };

      next();
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(501).send({ message: "saldo tidak cukup" });
  }
};

const refund = async (req, res, next) => {
  const { dataValues, paac, payt_ref } = req.data;

  try {
    await req.context.models.Payment_Account.update(
      {
        pacc_saldo: parseInt(paac.pacc_saldo) + parseInt(payt_ref.payt_credit),
      },
      {
        returning: true,
        where: { paac_account_number: dataValues.payt_paac_account_number },
      }
    );

    req.data = {
      dataValues: dataValues,
    };

    next();
  } catch (err) {
    console.log(err);
  }
};

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
  topup,
  order,
  refund,
};
