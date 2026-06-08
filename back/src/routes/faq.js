import { Router } from "express";
import { getFaq } from "../controllers/faq/getAllFaq.controller.js";
import { deleteFaqController } from "../controllers/faq/deleteFaq.controller.js";
import { updateFaqController } from "../controllers/faq/updateFaq.controller.js";
import { addFaqController } from "../controllers/faq/addFaq.controller.js";
import { createFaqSchema } from "../zodSchema/zodIndex.js";
import { validate } from "../middlewares/zod/zodValidator.js";
import { verifyToken, isAdmin } from "../utils/isAdmin.js";

const router = Router();

router.get("/", getFaq);
router.post("/", verifyToken, isAdmin, validate(createFaqSchema), addFaqController);
router.put("/:id", verifyToken, isAdmin, validate(createFaqSchema), updateFaqController);
router.delete("/:id", verifyToken, isAdmin, deleteFaqController);

export default router;