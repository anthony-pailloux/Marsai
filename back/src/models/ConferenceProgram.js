import { pool } from "../db/index.js"

const DAY_ORDER = "FIELD(day, 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')";

export async function findAll() {
  const [rows] = await pool.execute(
    `SELECT id, day, time, title, speaker, color, sort_order FROM conference_program ORDER BY ${DAY_ORDER}, sort_order ASC, time ASC, id ASC`,
  );
  return rows;
}

export async function findById(id) {
  const [rows] = await pool.execute(
    "SELECT id, day, time, title, speaker, color, sort_order FROM conference_program WHERE id = ?",
    [id],
  );
  return rows[0] || null;
}

export async function insert(data) {
  const [result] = await pool.execute(
    "INSERT INTO conference_program (day, time, title, speaker, color, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
    [
      data.day ?? "Friday",
      data.time ?? "09:00",
      data.title ?? "",
      data.speaker ?? null,
      data.color ?? "bg-sky-400",
      data.sort_order ?? 0,
    ],
  );
  return { id: result.insertId, ...data };
}
export const create = insert;

export async function update(id, data) {
  await pool.execute(
    "UPDATE conference_program SET day = ?, time = ?, title = ?, speaker = ?, color = ?, sort_order = ? WHERE id = ?",
    [
      data.day ?? "Friday",
      data.time ?? "09:00",
      data.title ?? "",
      data.speaker ?? null,
      data.color ?? "bg-sky-400",
      data.sort_order ?? 0,
      id,
    ],
  );
  const updated = await findById(id);
  return updated;
}

  // supprimer  les progr
  export async function remove(id) {
    const [result] = await pool.execute("DELETE FROM conference_program WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }