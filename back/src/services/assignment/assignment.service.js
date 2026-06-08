import { pool } from "../../db/index.js";
import * as assignmentModel from "../../models/assignment.model.js";

export function parseAssignmentPair(body) {
  const selectorId = Number(body?.selector_id);
  const videoId = Number(body?.video_id);

  if (!Number.isFinite(selectorId) || !Number.isFinite(videoId)) {
    return { error: "selector_id et video_id requis" };
  }

  return { selectorId, videoId };
}

export async function listSelectors() {
  const [rows] = await pool.execute(
    "SELECT id, email, name, last_name, role FROM users WHERE role = 'selector' ORDER BY name ASC",
  );
  return rows;
}

export async function listAssignments() {
  return assignmentModel.findAllAssignments();
}

export async function ensureSelectorExists(selectorId) {
  const [users] = await pool.execute(
    "SELECT id FROM users WHERE id = ? AND role = 'selector'",
    [selectorId],
  );
  return Boolean(users[0]);
}

export async function ensureVideoExists(videoId) {
  const [videos] = await pool.execute("SELECT id FROM videos WHERE id = ?", [
    videoId,
  ]);
  return Boolean(videos[0]);
}

export async function createAssignment(selectorId, videoId) {
  await assignmentModel.assignVideo(selectorId, videoId);
}

export async function deleteAssignment(selectorId, videoId) {
  return assignmentModel.unassignVideo(selectorId, videoId);
}
