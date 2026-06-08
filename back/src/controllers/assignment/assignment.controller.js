import * as assignmentService from "../../services/assignment/assignment.service.js";

export async function listSelectors(req, res) {
  try {
    const selectors = await assignmentService.listSelectors();
    return res.status(200).json({ selectors });
  } catch (error) {
    console.error("listSelectors error:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function listAssignments(req, res) {
  try {
    const assignments = await assignmentService.listAssignments();
    return res.status(200).json({ assignments });
  } catch (error) {
    console.error("listAssignments error:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function createAssignment(req, res) {
  try {
    const parsed = assignmentService.parseAssignmentPair(req.body);
    if (parsed.error) return res.status(400).json({ error: parsed.error });

    const { selectorId, videoId } = parsed;

    if (!(await assignmentService.ensureSelectorExists(selectorId))) {
      return res.status(400).json({ error: "Sélectionneur introuvable" });
    }

    if (!(await assignmentService.ensureVideoExists(videoId))) {
      return res.status(400).json({ error: "Vidéo introuvable" });
    }

    await assignmentService.createAssignment(selectorId, videoId);
    return res.status(201).json({ ok: true });
  } catch (error) {
    console.error("createAssignment error:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function deleteAssignment(req, res) {
  try {
    const parsed = assignmentService.parseAssignmentPair(req.body);
    if (parsed.error) return res.status(400).json({ error: parsed.error });

    const { selectorId, videoId } = parsed;
    const deleted = await assignmentService.deleteAssignment(selectorId, videoId);

    if (!deleted) {
      return res.status(404).json({ error: "Assignation introuvable" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("deleteAssignment error:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
