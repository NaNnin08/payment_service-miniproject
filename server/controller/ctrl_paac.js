const create = async (req, res) => {
  const { dataValues } = new req.context.models.Payment_Account(req.body);

  const paac = await req.context.models.Payment_Account.create(dataValues);

  return res.send(paac);
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
const findOne = async (req, res) => {
  const paac = await req.context.models.Payment_Account.findOne({
    where: { paac_account_number: req.params.id },
  });

  if (paac) {
    return res.send(paac);
  } else {
    return res.send("data has not found");
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

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
