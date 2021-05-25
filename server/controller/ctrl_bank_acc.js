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
const findOne = async (req, res) => {
  const bacc = await req.context.models.Bank_Accounts.findOne({
    where: { baac_acc_bank: req.params.id },
  });

  if (bacc) {
    return res.send(bacc);
  } else {
    return res.send("data has not found");
  }
};

// create update
const update = async (req, res) => {
  const { dataValues } = new req.context.models.Bank_Accounts(req.body);

  const bacc = await req.context.models.Bank_Accounts.update(dataValues, {
    returning: true,
    where: { baac_acc_bank: req.params.id },
  });
  return res.send(bacc);
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
  update,
  remove,
};
