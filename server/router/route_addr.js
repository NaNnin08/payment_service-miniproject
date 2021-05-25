import { Router } from "express";
import ctrl from "../controller";

const router = Router();
router.post("/", ctrl.Addr.create);
router.get("/", ctrl.Addr.findAll);
router.get("/:id", ctrl.Addr.findOne);
router.put("/:id", ctrl.Addr.update);
router.delete("/:id", ctrl.Addr.remove);

export default router;
