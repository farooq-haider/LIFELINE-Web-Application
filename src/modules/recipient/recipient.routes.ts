import { Router } from "express";
import RecipientController from "./recipient.controller";
import recipientAuthMiddleware from "../../middlewares/recipientAuth.middleware";

const router = Router();

router.post("/login", RecipientController.loginRecipient);
router.post("/signup", RecipientController.createRecipient);
router.post(
  "/getRec",
  recipientAuthMiddleware,
  RecipientController.getRecipientById
);

router.delete(
  "/delete",
  recipientAuthMiddleware,
  RecipientController.deleteAccount
);

router.put(
  "/update",
  recipientAuthMiddleware,
  RecipientController.updateRecipient
);

export default router;
