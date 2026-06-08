import * as assignmentModel from "../../models/assignment.model.js";
import { pool } from "../../db/index.js";

export async function listSelectors(req, res) {
  try {
    const [rows] = await pool.execute(
      "SELECT id, email, name, last_name, role FROM users WHERE role = 'selector' ORDER BY name ASC",
    );
    return res.status(200).json({ selectors: rows });
  } catch (error) {
    console.error("listSelectors error:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function listAssignments(req, res) {
  try {
    const assignments = await assignmentModel.findAllAssignments();
    return res.status(200).json({ assignments });
  } catch (error) {
    console.error("listAssignments error:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function createAssignment(req, res) {
  try {
    const selectorId = Number(req.body.selector_id);
    const videoId = Number(req.body.video_id);

    if (!Number.isFinite(selectorId) || !Number.isFinite(videoId)) {
      return res.status(400).json({ error: "selector_id et video_id requis" });
    }

    const [users] = await pool.execute(
      "SELECT id FROM users WHERE id = ? AND role = 'selector'",
      [selectorId],
    );
    if (!users[0]) {
      return res.status(400).json({ error: "Sélectionneur introuvable" });
    }

    const [videos] = await pool.execute("SELECT id FROM videos WHERE id = ?", [
      videoId,
    ]);
    if (!videos[0]) {
      return res.status(400).json({ error: "Vidéo introuvable" });
    }

    await assignmentModel.assignVideo(selectorId, videoId);
    return res.status(201).json({ ok: true });
  } catch (error) {
    console.error("createAssignment error:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function deleteAssignment(req, res) {
  try {
    const selectorId = Number(req.body.selector_id);
    const videoId = Number(req.body.video_id);

    if (!Number.isFinite(selectorId) || !Number.isFinite(videoId)) {
      return res.status(400).json({ error: "selector_id et video_id requis" });
    }

    const deleted = await assignmentModel.unassignVideo(selectorId, videoId);
    if (!deleted) return res.status(404).json({ error: "Assignation introuvable" });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("deleteAssignment error:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
