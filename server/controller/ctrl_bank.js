const create = async (req, res) => {
  const { dataValues } = new req.context.models.Bank(req.body);

  const bank = await req.context.models.Bank.create(dataValues);

  return res.send(bank);
};

//findAll = select * from regions
const findAll = async (req, res) => {
  const bank = await req.context.models.Bank.findAll();

  if (bank) {
    return res.send(bank);
  } else {
    return res.send("data has not found");
  }
};

//find by id
const findOne = async (req, res) => {
  const bank = await req.context.models.Bank.findOne({
    where: { bank_id: req.params.id },
  });

  if (bank) {
    return res.send(bank);
  } else {
    return res.send("data has not found");
  }
};

// create update
const update = async (req, res) => {
  const { dataValues } = new req.context.models.Bank(req.body);

  const bank = await req.context.models.Bank.update(dataValues, {
    returning: true,
    where: { bank_id: req.params.id },
  });
  return res.send(bank);
};

//delete
const remove = async (req, res) => {
  const Bank = await req.context.models.Bank.destroy({
    where: { bank_id: req.params.id },
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
