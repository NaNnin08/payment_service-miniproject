import { Router } from "express";
import ctrl from "../controller";

const router = Router();
router.post("/signup", ctrl.User.signup, ctrl.Paac.create, ctrl.User.findOne);
router.post("/signin", ctrl.User.signin);
router.post("/signout", ctrl.User.signout);
router.get("/", ctrl.User.findAll);
router.get("/:id", ctrl.User.findOne);
router.get("/email/:id", ctrl.User.findOneEmail);
router.get("/download/:filename", ctrl.User.photo);
router.get("/secured/find", ctrl.User.requireSignin, ctrl.User.findAll);
router.get("/hash/:id", ctrl.User.findOnePass);
router.put("/:id", ctrl.User.update, ctrl.User.findOne);
router.put("/hash/:id", ctrl.User.updatePass);
router.delete("/:id", ctrl.User.remove);
router.post("/comparePassword", ctrl.User.ComparePassword);
router.post("/requestForgotPassword", ctrl.User.sendRequestPassword);

export default router;
