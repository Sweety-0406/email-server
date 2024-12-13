import express from "express"
import { sendEmail, receiveEmails } from "../controllers/emailController.js"
import { authenticate } from "../middleware/authMiddlerware.js"

const router = express.Router()
router.post('/send', authenticate, sendEmail);
router.get('/receive', authenticate, receiveEmails);

export default router