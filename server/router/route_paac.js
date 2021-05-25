import { Router } from "express";
import ctrl from "../controller";

const router = Router();
router.post("/", ctrl.Paac.create);
router.get("/", ctrl.Paac.findAll);
router.get("/:id", ctrl.Paac.findOne);
router.put("/:id", ctrl.Paac.update);
router.delete("/:id", ctrl.Paac.remove);

export default router;
