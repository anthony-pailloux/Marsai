import { Router } from "express";
import GetAllContent from "../controllers/CMS/GetAllContent.controller.js";
import UpdateCms from "../controllers/CMS/UpdateCms.controller.js"
import GetContentByPageSection from "../controllers/CMS/GetContentByPageSection.controller.js";
import cmsUploadMiddleware from "../middlewares/cmsUploadMiddleware.js";
import { cmsValidateMiddleware } from "../middlewares/zod/zodCmsValidator.js";
import { verifyToken, isAdmin } from "../utils/isAdmin.js";

const router = Router();

router.get("/", GetAllContent);
router.get("/:page/:section/:locale", GetContentByPageSection);

router.put(
  "/:page/:section/:locale/:content_key",
  verifyToken,
  isAdmin,
  cmsUploadMiddleware,
  cmsValidateMiddleware,
  UpdateCms,
);

export default router;