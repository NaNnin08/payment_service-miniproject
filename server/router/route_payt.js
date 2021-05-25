import { Router } from "express";
import ctrl from "../controller";

const router = Router();
router.post("/", ctrl.Payt.create);
router.get("/", ctrl.Payt.findAll);
router.get("/:id", ctrl.Payt.findOne);
router.put("/:id", ctrl.Payt.update);
router.delete("/:id", ctrl.Payt.remove);

export default router;
