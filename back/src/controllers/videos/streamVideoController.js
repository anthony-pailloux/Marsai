import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import videosModel from "../../models/videos.model.js";
import { getObjectFromS3 } from "../../services/scalewayS3.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, "..", "..", "..", "uploads");
const VIDEOS_DIR = path.join(UPLOADS_DIR, "videos");

function parseRange(rangeHeader, fileSize) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader || "");
  if (!match) return null;

  const start = match[1] === "" ? 0 : Number(match[1]);
  const end = match[2] === "" ? fileSize - 1 : Number(match[2]);

  if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= fileSize) {
    return null;
  }

  return { start, end: Math.min(end, fileSize - 1) };
}

function streamLocalFile(req, res, filePath) {
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (!range) {
    return res.status(416).json({ error: "Range header requis" });
  }

  const parsed = parseRange(range, fileSize);
  if (!parsed) {
    return res.status(416).json({ error: "Range invalide" });
  }

  const { start, end } = parsed;
  const chunkSize = end - start + 1;

  res.writeHead(206, {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": chunkSize,
    "Content-Type": "video/mp4",
  });

  fs.createReadStream(filePath, { start, end }).pipe(res);
}

function resolveLocalVideoPath(key) {
  const basename = path.basename(String(key || ""));
  const candidates = [
    path.join(VIDEOS_DIR, basename),
    path.join(VIDEOS_DIR, key),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  return null;
}

async function streamVideoController(req, res) {
  try {
    const { id } = req.params;
    const range = req.headers.range;

    const video = await videosModel.findVideoFileById(id);

    if (!video) {
      return res.status(404).json({ error: "Vidéo introuvable" });
    }

    if (video.upload_status !== "Published") {
      return res.status(403).json({ error: "Vidéo non disponible" });
    }

    const key = video.video_file_name;

    if (!range) {
      return res.status(416).json({ error: "Range header requis" });
    }

    const useS3 = Boolean(process.env.SCALEWAY_BUCKET_NAME) && String(key).includes("/");

    if (useS3) {
      const s3Object = await getObjectFromS3({ key, range });
      const contentRange = s3Object.ContentRange;
      const contentLength = s3Object.ContentLength;
      const contentType = s3Object.ContentType || "video/mp4";

      res.writeHead(206, {
        "Content-Range": contentRange,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": contentType,
      });

      return s3Object.Body.pipe(res);
    }

    const localPath = resolveLocalVideoPath(key);
    if (localPath) {
      return streamLocalFile(req, res, localPath);
    }

    return res.status(404).json({ error: "Fichier vidéo introuvable" });
  } catch (error) {
    console.error("streamVideoController error:", error);

    const localPath = resolveLocalVideoPath(
      (await videosModel.findVideoFileById(req.params.id))?.video_file_name,
    );
    if (localPath && fs.existsSync(localPath)) {
      return streamLocalFile(req, res, localPath);
    }

    res.status(500).json({
      error: "Erreur streaming",
      details: error.message,
    });
  }
}

export default streamVideoController;