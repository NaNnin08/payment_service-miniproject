const create = async (req, res) => {
  const { dataValues } = new req.context.models.Payment_Transaction(req.body);

  const payt = await req.context.models.Payment_Transaction.create(dataValues);

  return res.send(payt);
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
const findOne = async (req, res) => {
  const payt = await req.context.models.Payment_Transaction.findOne({
    where: { payt_id: req.params.id },
  });

  if (payt) {
    return res.send(payt);
  } else {
    return res.send("data has not found");
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
const remove = async (req, res) => {
  const payt = await req.context.models.Payment_Transaction.destroy({
    where: { payt_id: req.params.id },
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
