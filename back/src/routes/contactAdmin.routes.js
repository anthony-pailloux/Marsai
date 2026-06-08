import { Router } from "express";
import { pool } from "../db/index.js";
import { verifyToken, isAdmin } from "../utils/isAdmin.js";
import {
  isSmtpConfigured,
  sendContactReplyEmail,
} from "../services/contactReplyEmail.service.js";

const router = Router();

router.use(verifyToken, isAdmin);

// GET /api/contact/admin/messages
router.get("/messages", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT
         id, name, last_name, subject, email, message, created_at,
         is_read, read_at, reply, replied_at, replied_by
       FROM contact_messages
       ORDER BY created_at DESC`,
    );

    res.json(rows);
  } catch (err) {
    console.error("Erreur GET messages:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST /api/contact/admin/messages/:id/read
router.post("/messages/:id/read", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: "ID invalide" });
    }

    const [r] = await pool.query(
      `UPDATE contact_messages
       SET is_read = 1,
           read_at = COALESCE(read_at, NOW())
       WHERE id = ?`,
      [id],
    );

    if (r.affectedRows === 0) {
      return res.status(404).json({ error: "Message introuvable" });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Erreur POST read:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST /api/contact/admin/messages/:id/reply
router.post("/messages/:id/reply", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const reply = String(req.body?.reply || "").trim();

    // replied_by optionnel (FK -> users.id), peut rester NULL
    const repliedByRaw = req.body?.replied_by;
    const repliedBy =
      repliedByRaw === undefined || repliedByRaw === null || repliedByRaw === ""
        ? null
        : Number(repliedByRaw);

    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: "ID invalide" });
    }
    if (!reply) {
      return res.status(400).json({ error: "reply est requis" });
    }
    if (repliedBy !== null && !Number.isFinite(repliedBy)) {
      return res.status(400).json({ error: "replied_by invalide" });
    }

    const [rows] = await pool.query(
      `SELECT id, email, subject, message
       FROM contact_messages
       WHERE id = ?`,
      [id],
    );

    const m = rows?.[0];
    if (!m) {
      return res.status(404).json({ error: "Message introuvable" });
    }

    await pool.query(
      `UPDATE contact_messages
       SET reply = ?,
           replied_at = NOW(),
           replied_by = ?,
           is_read = 1,
           read_at = COALESCE(read_at, NOW())
       WHERE id = ?`,
      [reply, repliedBy, id],
    );

    if (isSmtpConfigured()) {
      await sendContactReplyEmail({
        to: m.email,
        subject: m.subject,
        originalMessage: m.message,
        reply,
      });
    } else {
      console.warn(
        "MAIL_HOST/MAIL_USER/MAIL_PASS manquant : réponse enregistrée en BDD mais email non envoyé.",
      );
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Erreur POST reply:", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
});

export default router;
