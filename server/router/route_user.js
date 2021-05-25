import { Router } from "express";
import ctrl from "../controller";

const router = Router();
router.post("/signup", ctrl.User.signup);
router.post("/signin", ctrl.User.signin);
router.post("/signout", ctrl.User.signout);
router.get("/", ctrl.User.findAll);
router.get("/:id", ctrl.User.findOne);
router.get("/secured/find", ctrl.User.requireSignin, ctrl.User.findAll);
router.put("/:id", ctrl.User.update);
router.delete("/:id", ctrl.User.remove);

export default router;
