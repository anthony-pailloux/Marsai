import { Router } from "express";
import {
  adminListSubscribers,
  adminNewsletterStats,
} from "../controllers/adminNewsletter.controller.js";
import { verifyToken, isAdmin } from "../utils/isAdmin.js";

const router = Router();

router.get("/admin/newsletter/subscribers", verifyToken, isAdmin, adminListSubscribers);
router.get("/admin/newsletter/stats", verifyToken, isAdmin, adminNewsletterStats);

export default router;
