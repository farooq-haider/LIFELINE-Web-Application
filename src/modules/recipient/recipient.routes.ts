import { Router } from "express";
import RecipientController from "./recipient.controller";
//import recipientAuthMiddleware from "../../middlewares/donorAuth.middleware";

const router = Router();

router.post("/login", RecipientController.loginRecipient);
router.post("/signup", RecipientController.createRecipient);

export default router;
