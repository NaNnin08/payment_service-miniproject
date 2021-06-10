const dataValues = async (req, res, next) => {
  try {
    const { dataValues } = new req.context.models.Payment_Transaction(req.body);

    req.data = {
      dataValues: dataValues,
    };

    next();
  } catch (err) {
    console.log(err);
  }
};

const create = async (req, res) => {
  const { dataValues } = req.data;

  try {
    const payt = await req.context.models.Payment_Transaction.create(
      dataValues
    );

    res.send(payt);
  } catch (err) {
    console.log(err);
  }

  // const { dataValues } = new req.context.models.Payment_Transaction(req.body);

  // const paac = await req.context.models.Payment_Account.findOne({
  //   where: { paac_account_number: dataValues.payt_paac_account_number },
  // });

  // if (dataValues.payt_type === "topup" && dataValues.payt_dabet) {
  //   const bank = await req.context.models.Bank_Accounts.findOne({
  //     where: { baac_acc_bank: dataValues.payt_bacc_acc_bank },
  //   });

  //   if (bank.baac_saldo - dataValues.payt_dabet > 10000) {
  //     const bacc = await req.context.models.Bank_Accounts.update(
  //       {
  //         baac_saldo: bank.baac_saldo - dataValues.payt_dabet,
  //       },
  //       {
  //         returning: true,
  //         where: { baac_acc_bank: dataValues.payt_bacc_acc_bank },
  //       }
  //     );

  //     const topup = await req.context.models.Payment_Account.update(
  //       {
  //         pacc_saldo:
  //           parseInt(paac.pacc_saldo) + parseInt(dataValues.payt_dabet),
  //       },
  //       {
  //         returning: true,
  //         where: { paac_account_number: dataValues.payt_paac_account_number },
  //       }
  //     );

  //     const payt = await req.context.models.Payment_Transaction.create(
  //       dataValues
  //     );

  //     return res.send(payt);
  //   } else {
  //     return res.send("saldo tidak cukup");
  //   }
  // }

  // if (dataValues.payt_type === "order" && dataValues.payt_credit) {
  //   if (parseInt(paac.pacc_saldo) > parseInt(dataValues.payt_credit)) {
  //     const order = await req.context.models.Payment_Account.update(
  //       {
  //         pacc_saldo:
  //           parseInt(paac.pacc_saldo) - parseInt(dataValues.payt_credit),
  //       },
  //       {
  //         returning: true,
  //         where: { paac_account_number: dataValues.payt_paac_account_number },
  //       }
  //     );

  //     const payt = await req.context.models.Payment_Transaction.create(
  //       dataValues
  //     );

  //     return res.send(payt);
  //   } else {
  //     return res.send("saldo tidak cukup");
  //   }
  // }

  // if (dataValues.payt_type === "refund" && dataValues.payt_trx_number_ref) {
  //   const payt_ref = await req.context.models.Payment_Transaction.findOne({
  //     where: { payt_trx_number: dataValues.payt_trx_number_ref },
  //   });

  //   const refund = await req.context.models.Payment_Account.update(
  //     {
  //       pacc_saldo: parseInt(paac.pacc_saldo) + parseInt(payt_ref.payt_credit),
  //     },
  //     {
  //       returning: true,
  //       where: { paac_account_number: dataValues.payt_paac_account_number },
  //     }
  //   );

  //   const payt = await req.context.models.Payment_Transaction.create(
  //     dataValues
  //   );

  //   return res.send(payt);
  // }
};

//findAll = select * from regions
const findAll = async (req, res) => {
  const payt = await req.context.models.Payment_Transaction.findAll();

  if (payt) {
    return res.send(payt);
  } else {
    return res.send("data has not found");
  }
};

//find by id
const findOne = async (req, res, next) => {
  if (req.params.id) {
    const payt = await req.context.models.Payment_Transaction.findOne({
      where: { payt_id: req.params.id },
      include: [
        {
          all: true,
        },
      ],
    });

    if (payt) {
      return res.send(payt);
    } else {
      return res.status(404).send({ message: "data has not found" });
    }
  } else {
    if (req.data.paac) {
      const { dataValues, paac } = req.data;

      try {
        const payt_ref = await req.context.models.Payment_Transaction.findOne({
          where: { payt_trx_number: dataValues.payt_trx_number_ref },
        });

        req.data = {
          dataValues: dataValues,
          payt_ref: payt_ref,
          paac: paac,
        };

        next();
      } catch (err) {
        console.log(err);
      }
    } else {
      const { dataValues } = req.data;

      try {
        const payt_ref = await req.context.models.Payment_Transaction.findOne({
          where: { payt_trx_number: dataValues.payt_trx_number_ref },
        });

        req.data = {
          dataValues: dataValues,
          payt_ref: payt_ref,
        };

        next();
      } catch (err) {
        console.log(err);
      }
    }
  }
};

const findOneByUser = async (req, res) => {
  const payt = await req.context.models.Payment_Transaction.findAll({
    where: { payt_paac_account_number: req.params.id },
  });

  if (payt) {
    return res.send(payt);
  } else {
    return res.status(404).send({ message: "data has not found" });
  }
};

const findOneByOrder = async (req, res) => {
  const payt = await req.context.models.Payment_Transaction.findOne({
    where: { payt_order_number: req.params.id },
  });

  if (payt) {
    return res.send(payt);
  } else {
    return res.status(404).send({ message: "data has not found" });
  }
};

// create update
const update = async (req, res) => {
  const { dataValues } = new req.context.models.Payment_Transaction(req.body);

  if (!dataValues.payt_id) {
    dataValues.payt_id = parseInt(req.params.id);
  }

  const payt = await req.context.models.Payment_Transaction.update(dataValues, {
    returning: true,
    where: { payt_id: req.params.id },
  });
  return res.send(payt);
};

//delete
const remove = async (req, res, next) => {
  if (req.params.id) {
    const payt = await req.context.models.Payment_Transaction.destroy({
      where: { payt_id: req.params.id },
    });
    return res.send("data has been delete");
  } else {
    const { dataValues } = req.data;

    try {
      await req.context.models.Payment_Transaction.destroy({
        where: { payt_trx_number: dataValues.payt_trx_number_ref },
      });

      req.data = {
        dataValues: dataValues,
      };

      next();
    } catch (err) {
      console.log(err);
    }
  }
};

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
  dataValues,
  findOneByUser,
  findOneByOrder,
};
