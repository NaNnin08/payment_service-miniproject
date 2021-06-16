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

const createTransferWallet = async (req, res, next) => {
  const { dataValuesFrom, dataValuesTo } = req.data;

  try {
    const paytFrom = await req.context.models.Payment_Transaction.create(
      dataValuesFrom
    );

    const paytTo = await req.context.models.Payment_Transaction.create(
      dataValuesTo
    );

    req.user_id = req.amountFromEmail.user_id;

    next();
  } catch (err) {
    console.log(err);
  }
};

const createTransferWalletBank = async (req, res, next) => {
  const data = {
    dataValuesTo: {
      payt_credit: req.body.amount,
      payt_paac_account_number:
        req.amountFromEmail.payment_account.dataValues.paac_account_number,
      payt_type: "transferTo",
      payt_desc: `Nama penerima: ${req.amountToEmail.user_name} email: ${req.amountToEmail.user_email} pesan: ${req.body.message}`,
      payt_bacc_acc_bank: req.body.bank,
    },
    dataValuesFrom: {
      payt_dabet: parseFloat(req.body.amount) - parseFloat(req.body.biaya),
      payt_paac_account_number:
        req.amountToEmail.payment_account.dataValues.paac_account_number,
      payt_type: "transferFrom",
      payt_desc: `Nama pengirim: ${req.amountFromEmail.user_name} email: ${req.amountFromEmail.user_email} pesan: ${req.body.message}`,
    },
  };

  try {
    const paytFrom = await req.context.models.Payment_Transaction.create(
      data.dataValuesFrom
    );

    const paytTo = await req.context.models.Payment_Transaction.create(
      data.dataValuesTo
    );

    req.user_id = req.amountFromEmail.user_id;

    next();
  } catch (err) {
    console.log(err);
  }
};

const createTransferBank = async (req, res, next) => {
  const data = {
    payt_credit: req.body.amount,
    payt_paac_account_number:
      req.amountFromEmail.payment_account.dataValues.paac_account_number,
    payt_type: "transferToBank",
    payt_bacc_acc_bank: req.body.bank,
  };

  try {
    const payt = await req.context.models.Payment_Transaction.create(data);

    req.user_id = req.amountFromEmail.user_id;

    next();
  } catch (err) {
    console.log(err);
  }
};

const createRequest = async (req, res, next) => {
  const data = {
    payt_dabet: req.body.payt_dabet,
    payt_paac_account_number: req.body.payt_paac_account_number,
    payt_type: "request",
    payt_desc: req.body.payt_desc,
  };

  try {
    const payt = await req.context.models.Payment_Transaction.create(data);

    req.payt = payt;

    next();
  } catch (err) {
    console.log(err);
  }
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

const sendRequestPayment = async (req, res) => {
  const { to_email, from_email } = req.body;
  const { payt_trx_number, payt_dabet, payt_desc, payt_date } = req.payt;
  const nodemailer = require("nodemailer");
  const ejs = require("ejs");
  const date = require("date-fns");
  // const mailgun = require("mailgun-js");
  // const DOMAIN = "sandboxb0fdc15074174fbeab465a48e1523db8.mailgun.org";
  const juice = require("juice");

  // const mg = mailgun({
  //   apiKey: "67dc2d46486400f3bd4be0dc97f431bb-24e2ac64-8846c47f",
  //   domain: DOMAIN,
  // });

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "services.bayar@gmail.com",
      pass: "jk89312htsad5612RT",
    },
  });
  const data = await ejs.renderFile(process.cwd() + "/test.ejs", {
    to_email: to_email,
    from_email: from_email,
    note: payt_desc,
    trx: payt_trx_number,
    date: date.format(new Date(payt_date), "dd MMMM yyyy"),
    amount: payt_dabet,
  });

  const htmlWithStylesInlined = juice(data);

  // mg.messages().send(
  //   {
  //     from: "Amazona <amazona@mg.yourdomain.com>",
  //     to: `nidasunandar.apu@gmail.com`,
  //     subject: `New order`,
  //     html: template(),
  //   },
  //   (error, body) => {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log(body);
  //     }
  //   }
  // );
  // res.send({ message: "Order Paid" });

  let msg = {
    from: '"Test" <dagmar97@ethereal.email>',
    to: `${to_email}`,
    subject: "Hello ✔",
    // text: "Hello world?",
    html: htmlWithStylesInlined,
  };

  // // send email
  let info = await transporter.sendMail(msg, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent: " + info.response);
      res.send("email has been send");
    }
  });

  // console.log("Message sent: %s", info.messageId);
  // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
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
  createTransferWallet,
  createTransferWalletBank,
  createTransferBank,
  sendRequestPayment,
  createRequest,
};
