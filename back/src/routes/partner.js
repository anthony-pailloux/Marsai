import { Router } from "express";

import uploadPartner from "../middlewares/partnerMiddleware.js";

import AddPartnerController from "../controllers/partner/AddPartner.controller.js";
import GetAllPartnerController from "../controllers/partner/GetAllPartner.controller.js";
import UpdatePartnerController from "../controllers/partner/UpdatePartner.controller.js";
import GetOnePartnerController from "../controllers/partner/GetOnePartner.controller.js";
import DeletePartnerController from "../controllers/partner/DeletePartner.controller.js";
import { validate } from "../middlewares/zod/zodValidator.js";
import { createPartnerSchema, filePartnerImageSchema, optionalFilePartnerImageSchema } from "../zodSchema/zodIndex.js";
import { verifyToken, isAdmin } from "../utils/isAdmin.js";

const router = Router();

router.get("/", GetAllPartnerController);
router.get("/:id", GetOnePartnerController);

router.post(
  "/",
  verifyToken,
  isAdmin,
  uploadPartner.single("img"),
  validate([createPartnerSchema, filePartnerImageSchema], { includeFile: true }),
  AddPartnerController,
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  uploadPartner.single("file"),
  validate([createPartnerSchema, optionalFilePartnerImageSchema], { includeFile: true }),
  UpdatePartnerController,
);

router.delete("/:id", verifyToken, isAdmin, DeletePartnerController);

export default router;