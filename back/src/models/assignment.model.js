import { pool } from "../db/index.js";

export async function findAllAssignments() {
  const [rows] = await pool.execute(`
    SELECT
      a.id,
      a.selector_id,
      a.video_id,
      a.assigned_at,
      u.email AS selector_email,
      u.name AS selector_name,
      u.last_name AS selector_last_name,
      v.title AS video_title
    FROM assignment a
    JOIN users u ON u.id = a.selector_id
    JOIN videos v ON v.id = a.video_id
    ORDER BY a.assigned_at DESC
  `);
  return rows;
}

export async function findVideoIdsBySelector(selectorId) {
  const [rows] = await pool.execute(
    "SELECT video_id FROM assignment WHERE selector_id = ?",
    [selectorId],
  );
  return rows.map((r) => r.video_id);
}

export async function assignVideo(selectorId, videoId) {
  const [result] = await pool.execute(
    "INSERT IGNORE INTO assignment (selector_id, video_id) VALUES (?, ?)",
    [selectorId, videoId],
  );
  return result.affectedRows > 0;
}

export async function unassignVideo(selectorId, videoId) {
  const [result] = await pool.execute(
    "DELETE FROM assignment WHERE selector_id = ? AND video_id = ?",
    [selectorId, videoId],
  );
  return result.affectedRows > 0;
}
