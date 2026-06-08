import { pool } from "../db/index.js";

export async function findAllAwards() {
  const [rows] = await pool.execute(
    "SELECT id, title, img, rank, created_at, updated_at FROM awards ORDER BY rank ASC, id ASC",
  );
  return rows;
}

export async function findAwardById(id) {
  const [rows] = await pool.execute(
    "SELECT id, title, img, rank, created_at, updated_at FROM awards WHERE id = ?",
    [id],
  );
  return rows[0] || null;
}

export async function createAward({ title, img, rank }) {
  const [result] = await pool.execute(
    "INSERT INTO awards (title, img, rank) VALUES (?, ?, ?)",
    [title, img, rank],
  );
  return findAwardById(result.insertId);
}

export async function updateAward(id, { title, img, rank }) {
  await pool.execute(
    "UPDATE awards SET title = ?, img = ?, rank = ? WHERE id = ?",
    [title, img, rank, id],
  );
  return findAwardById(id);
}

export async function deleteAward(id) {
  await pool.execute("DELETE FROM awards_video WHERE award_id = ?", [id]);
  const [result] = await pool.execute("DELETE FROM awards WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

export async function assignVideo(awardId, videoId) {
  await pool.execute(
    "INSERT IGNORE INTO awards_video (award_id, video_id) VALUES (?, ?)",
    [awardId, videoId],
  );
}

export async function unassignVideo(awardId, videoId) {
  const [result] = await pool.execute(
    "DELETE FROM awards_video WHERE award_id = ? AND video_id = ?",
    [awardId, videoId],
  );
  return result.affectedRows > 0;
}

export async function findPublicAwardsWithVideos() {
  const [rows] = await pool.execute(`
    SELECT
      a.id AS award_id,
      a.title AS award_title,
      a.img AS award_img,
      a.rank AS award_rank,
      v.id AS video_id,
      v.title,
      v.title_en,
      v.cover,
      v.director_name,
      v.director_lastname
    FROM awards a
    LEFT JOIN awards_video av ON av.award_id = a.id
    LEFT JOIN videos v ON v.id = av.video_id AND v.upload_status = 'Published'
    ORDER BY a.rank ASC, a.id ASC, v.id ASC
  `);
  return rows;
}
