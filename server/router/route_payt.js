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
router.get("/", ctrl.Payt.findAll);
router.get("/:id", ctrl.Payt.findOne);
router.get("/user/:id", ctrl.Payt.findOneByUser);
router.put("/:id", ctrl.Payt.update);
router.delete("/:id", ctrl.Payt.remove);

export default router;
