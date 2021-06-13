const create = async (req, res) => {
  const { dataValues } = new req.context.models.Bank_Accounts(req.body);

  const bacc = await req.context.models.Bank_Accounts.create(dataValues);

  return res.send(bacc);
};

//findAll = select * from regions
const findAll = async (req, res) => {
  const bacc = await req.context.models.Bank_Accounts.findAll();

  if (bacc) {
    return res.send(bacc);
  } else {
    return res.send("data has not found");
  }
};

//find by id
const findOne = async (req, res, next) => {
  if (req.params.id) {
    const bacc = await req.context.models.Bank_Accounts.findOne({
      where: { baac_acc_bank: req.params.id },
    });

    if (bacc) {
      return res.send(bacc);
    } else {
      return res.send("data has not found");
    }
  } else {
    if (req.body.bank) {
      const { bank } = req.body;

      const result = await req.context.models.Bank_Accounts.findOne({
        where: { baac_acc_bank: bank },
      });

      req.bank = result;

      next();
    } else if (req.data.payt_ref) {
      const { dataValues, payt_ref } = req.data;

      const bank = await req.context.models.Bank_Accounts.findOne({
        where: { baac_acc_bank: dataValues.payt_bacc_acc_bank },
      });

      req.data = {
        dataValues: dataValues,
        bank: bank,
        payt_ref: payt_ref,
      };

      next();
    } else {
      const { dataValues } = req.data;

      const bank = await req.context.models.Bank_Accounts.findOne({
        where: { baac_acc_bank: dataValues.payt_bacc_acc_bank },
      });

      req.data = {
        dataValues: dataValues,
        bank: bank,
      };

      next();
    }
  }
};

const findOneByUser = async (req, res) => {
  const bacc = await req.context.models.Bank_Accounts.findAll({
    where: { baac_user_id: req.params.id },
    include: [
      {
        model: req.context.models.Bank,
      },
    ],
  });

  if (bacc) {
    return res.send(bacc);
  } else {
    return res.send("data has not found");
  }
};

// create update
const update = async (req, res, next) => {
  if (req.params.id) {
    const { dataValues } = new req.context.models.Bank_Accounts(req.body);

    const bacc = await req.context.models.Bank_Accounts.update(dataValues, {
      returning: true,
      where: { baac_acc_bank: req.params.id },
    });
    return res.send(bacc);
  } else {
    if (req.data) {
      const { dataValues, bank } = req.data;

      if (dataValues.payt_type === "order") {
        if (bank.baac_saldo - dataValues.payt_credit > 10000) {
          try {
            await req.context.models.Bank_Accounts.update(
              {
                baac_saldo:
                  parseFloat(bank.baac_saldo) -
                  parseFloat(dataValues.payt_credit),
              },
              {
                returning: true,
                where: { baac_acc_bank: dataValues.payt_bacc_acc_bank },
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
          return res.send("saldo tidak cukup");
        }
      }

      if (dataValues.payt_type === "refund") {
        const { payt_ref } = req.data;

        try {
          await req.context.models.Bank_Accounts.update(
            {
              baac_saldo:
                parseFloat(bank.baac_saldo) + parseFloat(payt_ref.payt_credit),
            },
            {
              returning: true,
              where: { baac_acc_bank: dataValues.payt_bacc_acc_bank },
            }
          );

          req.data = {
            dataValues: dataValues,
          };

          next();
        } catch (err) {
          console.log(err);
        }
      }

      if (dataValues.payt_type === "topup") {
        if (bank.baac_saldo - dataValues.payt_dabet > 10000) {
          try {
            await req.context.models.Bank_Accounts.update(
              {
                baac_saldo:
                  parseFloat(bank.baac_saldo) -
                  parseFloat(dataValues.payt_dabet),
              },
              {
                returning: true,
                where: { baac_acc_bank: dataValues.payt_bacc_acc_bank },
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
      }
    } else if (req.bank && req.updateFromEmail) {
      const { baac_acc_bank, baac_saldo } = req.bank;
      const { amount, biaya } = req.body;

      try {
        await req.context.models.Bank_Accounts.update(
          {
            baac_saldo:
              parseFloat(baac_saldo) + (parseFloat(amount) - parseFloat(biaya)),
          },
          {
            returning: true,
            where: { baac_acc_bank: baac_acc_bank },
          }
        );

        next();
      } catch (err) {
        console.log(err);
      }
    } else {
      const { baac_acc_bank, baac_saldo } = req.bank;
      const { amount, biaya } = req.body;

      try {
        await req.context.models.Bank_Accounts.update(
          {
            baac_saldo:
              parseFloat(baac_saldo) - (parseFloat(amount) + parseFloat(biaya)),
          },
          {
            returning: true,
            where: { baac_acc_bank: baac_acc_bank },
          }
        );

        req.updateFromEmail = true;

        next();
      } catch (err) {
        console.log(err);
      }
    }
  }
};

//delete
const remove = async (req, res) => {
  const Bank_Accounts = await req.context.models.Bank_Accounts.destroy({
    where: { baac_acc_bank: req.params.id },
  });
  return res.send("data has been delete");
};

export default {
  create,
  findAll,
  findOne,
  findOneByUser,
  update,
  remove,
};
