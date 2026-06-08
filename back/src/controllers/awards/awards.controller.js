import * as awardsModel from "../../models/awards.model.js";

export async function getPublicAwards(req, res) {
  try {
    const rows = await awardsModel.findPublicAwardsWithVideos();
    const grouped = {};

    for (const row of rows) {
      if (!grouped[row.award_id]) {
        grouped[row.award_id] = {
          id: row.award_id,
          title: row.award_title,
          img: row.award_img,
          rank: row.award_rank,
          videos: [],
        };
      }
      if (row.video_id) {
        grouped[row.award_id].videos.push({
          id: row.video_id,
          title: row.title,
          title_en: row.title_en,
          cover: row.cover,
          director_name: row.director_name,
          director_lastname: row.director_lastname,
        });
      }
    }

    return res.status(200).json({ awards: Object.values(grouped) });
  } catch (error) {
    console.error("getPublicAwards error:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function listAwardsAdmin(req, res) {
  try {
    const awards = await awardsModel.findAllAwards();
    return res.status(200).json({ awards });
  } catch (error) {
    console.error("listAwardsAdmin error:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function createAward(req, res) {
  try {
    const award = await awardsModel.createAward(req.body);
    return res.status(201).json(award);
  } catch (error) {
    console.error("createAward error:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function updateAward(req, res) {
  try {
    const existing = await awardsModel.findAwardById(req.params.id);
    if (!existing) return res.status(404).json({ error: "Award introuvable" });

    const award = await awardsModel.updateAward(req.params.id, {
      title: req.body.title ?? existing.title,
      img: req.body.img ?? existing.img,
      rank: req.body.rank ?? existing.rank,
    });
    return res.status(200).json(award);
  } catch (error) {
    console.error("updateAward error:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function deleteAward(req, res) {
  try {
    const deleted = await awardsModel.deleteAward(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Award introuvable" });
    return res.status(204).send();
  } catch (error) {
    console.error("deleteAward error:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function assignAwardVideo(req, res) {
  try {
    const awardId = Number(req.params.id);
    const videoId = Number(req.body.video_id);
    if (!Number.isFinite(awardId) || !Number.isFinite(videoId)) {
      return res.status(400).json({ error: "award_id et video_id requis" });
    }

    const award = await awardsModel.findAwardById(awardId);
    if (!award) return res.status(404).json({ error: "Award introuvable" });

    await awardsModel.assignVideo(awardId, videoId);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("assignAwardVideo error:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function unassignAwardVideo(req, res) {
  try {
    const awardId = Number(req.params.id);
    const videoId = Number(req.params.videoId);
    if (!Number.isFinite(awardId) || !Number.isFinite(videoId)) {
      return res.status(400).json({ error: "Paramètres invalides" });
    }

    await awardsModel.unassignVideo(awardId, videoId);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("unassignAwardVideo error:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
