const create = async (req, res) => {
  const { dataValues } = new req.context.models.Pays(req.body);

  const pays = await req.context.models.Pays.create(dataValues);

  return res.send(pays);
};

const findOne = async (req, res) => {
  const pays = await req.context.models.Pays.findOne({
    where: { pays_order_number: req.params.id },
  });

  if (pays) {
    return res.send(pays);
  } else {
    return res.send("data has not found");
  }
};

export default {
  create,
  findOne,
};
