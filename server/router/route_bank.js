import { Router } from "express";
import ctrl from "../controller";

const router = Router();
router.post("/", ctrl.Bank.create);
router.get("/", ctrl.Bank.findAll);
router.get("/:id", ctrl.Bank.findOne);
router.put("/:id", ctrl.Bank.update);
router.delete("/:id", ctrl.Bank.remove);

export default router;
