import videosModel from "../../models/videos.model.js";
import * as assignmentModel from "../../models/assignment.model.js";

// Récupère toutes les vidéos pour l'administration (filtrées pour les sélecteurs)
async function adminVideosListController(req, res) {
  try {
    const role = String(req.user?.role || "").toLowerCase();
    let videos;

    if (role === "selector") {
      const videoIds = await assignmentModel.findVideoIdsBySelector(req.user.id);
      videos = await videosModel.findVideosAdminByIds(videoIds);
    } else {
      videos = await videosModel.findAllVideosAdmin();
    }

    return res.status(200).json({ videos });
  } catch (error) {
    // Gestion erreur serveur
    console.error("adminVideosListController error:", error);
    return res
      .status(500)
      .json({ error: "Erreur serveur", details: error.message });
  }
}

export default adminVideosListController;
