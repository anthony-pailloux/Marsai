import { Router } from "express";
import GetAllJuryController from "../controllers/jury/GetAllJury.controller.js";
import CreateJuryController from "../controllers/jury/CreateJury.controller.js";
import UpdateJuryController from "../controllers/jury/UpdateJury.controller.js";
import DeleteJuryController from "../controllers/jury/DeleteJury.controller.js";
import { uploadJury } from "../middlewares/uploadJury.js";
import { validate } from "../middlewares/zod/zodValidator.js";
import { createUserJurySchema, createJurySchema, fileJuryImageSchema, optionalFileJuryImageSchema } from "../zodSchema/zodIndex.js";
import { verifyToken, isAdmin } from "../utils/isAdmin.js";

const router = Router();

router.get("/", GetAllJuryController);
router.post(
  "/",
  verifyToken,
  isAdmin,
  uploadJury.single("img"),
  validate([createUserJurySchema, createJurySchema, fileJuryImageSchema], { includeFile: true }),
  CreateJuryController,
);
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  uploadJury.single("img"),
  validate([createUserJurySchema, createJurySchema, optionalFileJuryImageSchema], { includeFile: true }),
  UpdateJuryController,
);
router.delete("/:id", verifyToken, isAdmin, DeleteJuryController);

export default router;