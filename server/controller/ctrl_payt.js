import { Op } from "sequelize";
import Pagination from "../helpers/Pagination";
import midtransClient from "midtrans-client";

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

const create = async (req, res, next) => {
  const { dataValues } = req.data
    ? req.data
    : new req.context.models.Payment_Transaction(req.body);

  try {
    const payt = await req.context.models.Payment_Transaction.create(
      dataValues
    );

    if (payt.payt_type === "topup with midtrans") {
      req.midtransData = payt;

      next();
    } else {
      res.send(payt);
    }
  } catch (err) {
    console.log(err);
  }
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

        const payt_check = await req.context.models.Payment_Transaction.findOne(
          {
            where: { payt_trx_number_ref: dataValues.payt_trx_number_ref },
          }
        );

        if (!payt_check && payt_ref) {
          req.data = {
            dataValues: dataValues,
            payt_ref: payt_ref,
          };

          next();
        } else if (!payt_ref) {
          res.status(404).send({
            message: `Order with number transaction ${dataValues.payt_trx_number_ref} not found!`,
          });
        } else {
          res.status(401).send({
            message: `Refund fail, order with number transaction ${dataValues.payt_trx_number_ref} has been refund!`,
          });
        }
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
      user: process.env.USER_GMAIL,
      pass: process.env.PASS_GMAIL,
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
    from: `${from_email}`,
    to: `${to_email}`,
    subject: "Request Payment, Bayar ???",
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

const paymentPaging = async (req, res) => {
  const { page, size, cari, order } = req.query;
  const Account = req.params.id ? req.params.id : null;

  let condition =
    Account && cari
      ? {
          payt_paac_account_number: Account,
          [Op.or]: [
            { payt_trx_number: { [Op.iLike]: `%${cari}%` } },
            { payt_type: { [Op.iLike]: `%${cari}%` } },
            { payt_order_number: { [Op.iLike]: `%${cari}%` } },
          ],
        }
      : cari
      ? {
          [Op.or]: [
            { payt_trx_number: { [Op.iLike]: `%${cari}%` } },
            { payt_type: { [Op.iLike]: `%${cari}%` } },
            { payt_order_number: { [Op.iLike]: `%${cari}%` } },
          ],
        }
      : Account
      ? {
          payt_paac_account_number: Account,
        }
      : null;

  let orderBy = order
    ? order === "asc"
      ? [["payt_id", "ASC"]]
      : [["payt_id", "DESC"]]
    : [["payt_id", "DESC"]];

  const { limit, offset } = Pagination.getPagination(page, size);

  try {
    const payt = await req.context.models.Payment_Transaction.findAndCountAll({
      where: condition,
      limit,
      offset,
      order: orderBy,
    });

    const response = Pagination.getPagingData(payt, page, limit);

    res.send(response);
  } catch (error) {
    console.log(error.message);
  }
};

const paymentMidtrans = async (req, res) => {
  const dataMidtrans = req.midtransData;

  // Create Snap API instance
  let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction: false,
    serverKey: "SB-Mid-server-tGIIXbqzCCqOprPdkiR1Bbgu",
  });

  const parameter = {
    transaction_details: {
      order_id: dataMidtrans.payt_trx_number,
      gross_amount: dataMidtrans.payt_dabet,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: "Nida",
      last_name: "Sunandar",
      email: "nida.pra@example.com",
      phone: "08111222333",
    },
  };

  // let parameter = req.body;

  snap.createTransaction(parameter).then((transaction) => {
    // transaction token
    let transactionToken = transaction.token;

    res.send({ token: transactionToken });
  });
};

const midtransNotification = async (req, res) => {
  const dataMetadata = {
    payt_midtrans_status: req.body.transaction_status,
    payt_midtrans_metadata: JSON.stringify(req.body).replace(/"/g, '\\"'),
  };

  const payt = await req.context.models.Payment_Transaction.update(
    dataMetadata,
    {
      returning: true,
      where: { payt_trx_number: req.body.order_id },
    }
  );

  return res.send(payt);
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
  paymentPaging,
  paymentMidtrans,
  midtransNotification,
};
