import { Router } from "express";
import ctrl from "../controller";

const router = Router();
router.post("/", ctrl.Payt.create);
router.post(
  "/topup",
  ctrl.Payt.dataValues,
  ctrl.Baac.findOne,
  ctrl.Baac.update,
  ctrl.Paac.findOne,
  ctrl.Paac.topup,
  ctrl.Payt.create
);
router.post(
  "/order",
  ctrl.Payt.dataValues,
  ctrl.Paac.findOne,
  ctrl.Paac.order,
  ctrl.Payt.create
);
router.post(
  "/refund",
  ctrl.Payt.dataValues,
  ctrl.Paac.findOne,
  ctrl.Payt.findOne,
  ctrl.Paac.refund,
  ctrl.Payt.create
);
router.post(
  "/refundV2",
  ctrl.Payt.dataValues,
  ctrl.Payt.findOne,
  ctrl.Paac.findOne,
  ctrl.Paac.refund,
  ctrl.Payt.create
);
router.post(
  "/orderCC",
  ctrl.Payt.dataValues,
  ctrl.Baac.findOne,
  ctrl.Baac.update,
  ctrl.Payt.create
);
router.post(
  "/refundCC",
  ctrl.Payt.dataValues,
  ctrl.Payt.findOne,
  ctrl.Baac.findOne,
  ctrl.Baac.update,
  ctrl.Payt.remove,
  ctrl.Payt.create
);
router.post(
  "/transferWallet",
  ctrl.User.findOneEmailTransferWallet,
  ctrl.User.findOneEmailTransferWallet,
  ctrl.Paac.transferWallet,
  ctrl.Paac.transferWallet,
  ctrl.Payt.createTransferWallet,
  ctrl.User.findOne
);
router.post(
  "/transferWalletBank",
  ctrl.User.findOneEmailTransferWallet,
  ctrl.User.findOneEmailTransferWallet,
  ctrl.Baac.findOne,
  ctrl.Baac.update,
  ctrl.Paac.transferWallet,
  ctrl.Payt.createTransferWalletBank,
  ctrl.User.findOne
);
router.post(
  "/transferBank",
  ctrl.User.findOneEmailTransferWallet,
  ctrl.Paac.transferWallet,
  ctrl.Baac.findOne,
  ctrl.Baac.update,
  ctrl.Payt.createTransferBank,
  ctrl.User.findOne
);
router.post(
  "/requestPayment",
  ctrl.Payt.createRequest,
  ctrl.Payt.sendRequestPayment
);
router.get("/", ctrl.Payt.findAll);
router.post("/payment/midtrans", ctrl.Payt.paymentMidtrans);
router.get("/:id", ctrl.Payt.findOne);
router.get("/user/:id", ctrl.Payt.findOneByUser);
router.get("/order/:id", ctrl.Payt.findOneByOrder);
router.get("/payment/paging", ctrl.Payt.paymentPaging);
router.get("/payment/paging/:id", ctrl.Payt.paymentPaging);
router.put("/:id", ctrl.Payt.update);
router.delete("/:id", ctrl.Payt.remove);

export default router;
