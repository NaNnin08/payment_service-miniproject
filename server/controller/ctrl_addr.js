const create = async (req, res) => {
  const { dataValues } = new req.context.models.Addres(req.body);

  const addres = await req.context.models.Addres.create(dataValues);

  return res.send(addres);
};

//findAll = select * from regions
const findAll = async (req, res) => {
  const addres = await req.context.models.Addres.findAll();

  if (addres) {
    return res.send(addres);
  } else {
    return res.send("data has not found");
  }
};

//find by id
const findOne = async (req, res) => {
  const addres = await req.context.models.Addres.findOne({
    where: { addr_id: req.params.id },
  });

  if (addres) {
    return res.send(addres);
  } else {
    return res.send("data has not found");
  }
};

// create update
const update = async (req, res) => {
  const { dataValues } = new req.context.models.Addres(req.body);

  if (!dataValues.addr_id) {
    dataValues.addr_id = parseInt(req.params.id);
  }

  const addres = await req.context.models.Addres.update(dataValues, {
    returning: true,
    where: { addr_id: req.params.id },
  });
  return res.send(addres);
};

//delete
const remove = async (req, res) => {
  const addres = await req.context.models.Addres.destroy({
    where: { addr_id: req.params.id },
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
