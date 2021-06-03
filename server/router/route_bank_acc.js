import { Router } from "express";
import ctrl from "../controller";

const router = Router();
router.post("/", ctrl.Baac.create);
router.get("/", ctrl.Baac.findAll);
router.get("/:id", ctrl.Baac.findOne);
router.get("/user/:id", ctrl.Baac.findOneByUser);
router.put("/:id", ctrl.Baac.update);
router.delete("/:id", ctrl.Baac.remove);

export default router;
