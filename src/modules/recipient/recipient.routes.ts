import { Router } from "express";
import RecipientController from "./recipient.controller";
// import recipientAuthMiddleware from "../../middlewares/recipientAuth.middleware";
import userAuthmiddleware from "../../middlewares/userAuth.middleware";

const router = Router();

router.post("/login", RecipientController.loginRecipient);
router.post("/signup", RecipientController.createRecipient);
router.post(
  "/getRec",
  userAuthmiddleware,
  RecipientController.getRecipientById
);

router.delete("/delete", userAuthmiddleware, RecipientController.deleteAccount);

router.put("/update", userAuthmiddleware, RecipientController.updateRecipient);

export default router;
