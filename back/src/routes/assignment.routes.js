import { Router } from "express";
import {
  listSelectors,
  listAssignments,
  createAssignment,
  deleteAssignment,
} from "../controllers/assignment/assignment.controller.js";
import { verifyToken, isAdmin } from "../utils/isAdmin.js";

const router = Router();

router.use(verifyToken, isAdmin);

router.get("/selectors", listSelectors);
router.get("/", listAssignments);
router.post("/", createAssignment);
router.delete("/", deleteAssignment);

export default router;
