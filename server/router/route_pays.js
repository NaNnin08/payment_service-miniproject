import { Router } from "express";
import ctrl from "../controller";

const router = Router();
router.post("/", ctrl.Pays.create);
router.get("/:id", ctrl.Pays.findOne);

export default router;
