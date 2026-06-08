import { Router } from "express";
import {
  getPublicAwards,
  listAwardsAdmin,
  createAward,
  updateAward,
  deleteAward,
  assignAwardVideo,
  unassignAwardVideo,
} from "../controllers/awards/awards.controller.js";
import { validate } from "../middlewares/zod/zodValidator.js";
import { createAwardSchema } from "../zodSchema/zodIndex.js";
import { verifyToken, isAdmin } from "../utils/isAdmin.js";

const router = Router();

router.get("/", getPublicAwards);
router.get("/admin", verifyToken, isAdmin, listAwardsAdmin);
router.post("/", verifyToken, isAdmin, validate(createAwardSchema), createAward);
router.put("/:id", verifyToken, isAdmin, validate(createAwardSchema), updateAward);
router.delete("/:id", verifyToken, isAdmin, deleteAward);
router.post("/:id/videos", verifyToken, isAdmin, assignAwardVideo);
router.delete("/:id/videos/:videoId", verifyToken, isAdmin, unassignAwardVideo);

export default router;
