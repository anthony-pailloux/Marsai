import { Router } from "express";
import {
  adminListNewsletters,
  adminCreateNewsletter,
  adminGetNewsletter,
  adminUpdateNewsletter,
  adminPreviewNewsletter,
  adminSendTestNewsletter,
} from "../controllers/adminNewsletters.controller.js";
import {
  adminScheduleNewsletter,
  adminCancelSchedule,
  adminSendNow,
} from "../controllers/adminNewsletters.controller.js";
import { verifyToken, isAdmin } from "../utils/isAdmin.js";

const router = Router();

const adminAuth = [verifyToken, isAdmin];

router.get("/admin/newsletters", adminAuth, adminListNewsletters);
router.post("/admin/newsletters", adminAuth, adminCreateNewsletter);

router.get("/admin/newsletters/:id", adminAuth, adminGetNewsletter);
router.put("/admin/newsletters/:id", adminAuth, adminUpdateNewsletter);

router.get("/admin/newsletters/:id/preview", adminAuth, adminPreviewNewsletter);
router.post("/admin/newsletters/:id/send-test", adminAuth, adminSendTestNewsletter);

router.post("/admin/newsletters/:id/send-now", adminAuth, adminSendNow);
router.post("/admin/newsletters/:id/schedule", adminAuth, adminScheduleNewsletter);
router.post("/admin/newsletters/:id/cancel-schedule", adminAuth, adminCancelSchedule);

export default router;
