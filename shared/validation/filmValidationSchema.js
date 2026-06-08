/**
 * Schémas Zod participation film — source unique front + back.
 * Importer via les fichiers re-export dans chaque package.
 */
import { z } from "zod";
import {
  MAX_PICTURE_FILE_SIZE,
  MAX_PICTURE_FILE_SIZE_LABEL,
  MAX_VIDEO_DURATION_SECONDS,
  MAX_VIDEO_FILE_SIZE,
  MAX_VIDEO_FILE_SIZE_MB,
  MIN_PICTURE_FILE_SIZE,
  MIN_PICTURE_FILE_SIZE_LABEL,
  MIN_VIDEO_FILE_SIZE,
  MIN_VIDEO_FILE_SIZE_MB,
  PICTURE_FORMATS,
  PICTURE_MIME_TYPES,
  VIDEO_MIME_TYPES,
} from "./filmValidationConstants.js";

const contributorItemSchema = z.object({
  full_name: z
    .string({ message: "Contributor full name must be a string." })
    .trim()
    .min(1, "Contributor full name is required.")
    .max(255, "Contributor full name must not exceed 255 characters."),

  profession: z
    .string({ message: "Contributor profession must be a string." })
    .trim()
    .min(1, "Contributor profession is required.")
    .max(155, "Contributor profession must not exceed 155 characters."),

  email: z
    .string({ message: "Contributor email must be a string." })
    .trim()
    .min(1, "Contributor email is required.")
    .max(255, "Contributor email must not exceed 255 characters.")
    .email({ message: "Contributor email format is invalid." }),

  gender: z
    .enum(["Mrs", "Mr"], { message: "Contributor gender must be Mrs or Mr." })
    .optional(),
});

const tagItemSchema = z
  .string({ message: "Tag must be a string." })
  .trim()
  .min(1, "Tag name cannot be empty.")
  .max(80, "Tag name must not exceed 80 characters.");

export const createFilmSchema = z.object({
  youtube_video_id: z
    .string({ message: "YouTube video ID must be a string." })
    .trim()
    .max(250, "YouTube video ID must not exceed 250 characters.")
    .optional()
    .or(z.literal("")),

  title: z
    .string({ message: "Title must be a string." })
    .trim()
    .min(1, "Title is required.")
    .max(100, "Title must not exceed 100 characters."),

  title_en: z
    .string({ message: "Title (EN) must be a string." })
    .trim()
    .min(1, "Title (EN) is required.")
    .max(100, "Title (EN) must not exceed 100 characters."),

  synopsis: z
    .string({ message: "Synopsis must be a string." })
    .trim()
    .min(1, "Synopsis is required.")
    .max(500, "Synopsis must not exceed 500 characters."),

  synopsis_en: z
    .string({ message: "Synopsis (EN) must be a string." })
    .trim()
    .min(1, "Synopsis (EN) is required.")
    .max(500, "Synopsis (EN) must not exceed 500 characters."),

  language: z
    .string({ message: "Language must be a string." })
    .trim()
    .min(1, "Language is required.")
    .max(100, "Language must not exceed 100 characters."),

  country: z
    .string({ message: "Country must be a string." })
    .trim()
    .length(2, "Country must be exactly 2 characters.")
    .regex(/^[A-Za-z]{2}$/, "Country must be a valid ISO 2-letter code.")
    .transform((value) => value.toUpperCase()),

  duration: z.preprocess(
    (value) => (value === undefined || value === "" ? undefined : Number(value)),
    z
      .number({ message: "Video duration is required." })
      .positive({ message: "Video duration must be positive." })
      .max(
        MAX_VIDEO_DURATION_SECONDS,
        `Video duration must not exceed ${MAX_VIDEO_DURATION_SECONDS} seconds`,
      ),
  ),

  tech_resume: z
    .string({ message: "Tech resume must be a string." })
    .trim()
    .min(1, "Tech resume is required.")
    .max(500, "Tech resume must not exceed 500 characters."),

  ai_tech: z
    .string({ message: "Ai tech must be a string." })
    .trim()
    .min(1, "Ai tech is required.")
    .max(100, "Ai tech must not exceed 100 characters."),

  creative_resume: z
    .string({ message: "Creative resume must be a string." })
    .trim()
    .min(1, "Creative resume is required.")
    .max(500, "Creative resume must not exceed 500 characters."),

  email: z
    .string({ message: "Email must be a string." })
    .trim()
    .min(1, "Email is required.")
    .max(255, "Email must not exceed 255 characters.")
    .email({ message: "Email format is invalid." }),

  director_name: z
    .string({ message: "Director first name must be a string." })
    .trim()
    .min(1, "Director first name is required.")
    .max(100, "Director first name must not exceed 100 characters.")
    .regex(
      /^[\p{L}\s'-]+$/u,
      "Director first name can only contain letters, spaces, apostrophes or hyphens.",
    ),

  director_lastname: z
    .string({ message: "Director last name must be a string." })
    .trim()
    .min(1, "Director last name is required.")
    .max(100, "Director last name must not exceed 100 characters.")
    .regex(
      /^[\p{L}\s'-]+$/u,
      "Director last name can only contain letters, spaces, apostrophes or hyphens.",
    ),

  director_gender: z.enum(["Mrs", "Mr"], {
    message: "Director gender must be Mrs or Mr.",
  }),

  birthday: z
    .string({ message: "Birthday must be a string" })
    .trim()
    .min(1, "Birthday is required")
    .refine((value) => {
      const [day, month, year] = value.split("-").map(Number);
      if (!day || !month || !year) return false;
      const d = new Date(year, month - 1, day);
      return !isNaN(d.getTime()) && d.getTime() <= Date.now();
    }, {
      message:
        "Birthday must be a valid date in DD-MM-YYYY format and must be in the past.",
    }),

  mobile_number: z
    .string({ message: "Mobile number must be a string" })
    .trim()
    .transform((value) => (value || "").replace(/\s+/g, ""))
    .refine(
      (value) =>
        value === "" || (/^\+?\d+$/.test(value) && value.length <= 20),
      {
        message:
          "Only digits and + at the beginning are allowed and max 20 characters for mobile number",
      },
    )
    .optional(),

  home_number: z
    .string({ message: "Home number must be a string" })
    .trim()
    .transform((value) => (value || "").replace(/\s+/g, ""))
    .refine(
      (value) =>
        value === "" || (/^\+?\d+$/.test(value) && value.length <= 20),
      {
        message:
          "Only digits and + at the beginning are allowed and max 20 characters for home number",
      },
    )
    .optional(),

  address: z
    .string({ message: "Address must be a string" })
    .trim()
    .min(1, "Address is required")
    .max(255, "Address must not exceed 255 characters")
    .refine(
      (value) => /^[\p{L}\p{N}\s.,\-/#'’()&@°µ]+$/u.test(value),
      { message: "Address contains invalid characters" },
    ),

  director_country: z
    .string({ message: "Director country must be a string." })
    .trim()
    .length(2, "Director country must be exactly 2 characters.")
    .regex(/^[A-Za-z]{2}$/, "Director country must be a valid ISO 2-letter code.")
    .transform((value) => value.toUpperCase()),

  discovery_source: z
    .string({ message: "Discovery source must be a string." })
    .trim()
    .min(1, "Discovery source is required")
    .max(50, "Discovery source must not exceed 50 characters."),

  ownership_certified: z.enum(["0", "1"]).optional(),

  promo_consent: z.enum(["0", "1"]).optional(),

  contributors: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value === undefined || value === null || String(value).trim() === "")
          return true;
        try {
          const contributorsParsed = JSON.parse(value);
          if (!Array.isArray(contributorsParsed)) return false;
          return z.array(contributorItemSchema).safeParse(contributorsParsed).success;
        } catch {
          return false;
        }
      },
      {
        message:
          "Contributors must be a valid JSON array of objects with full_name, profession, email and optional gender.",
      },
    ),

  tags: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value === undefined || value === null || String(value).trim() === "")
          return true;
        try {
          const tagsParsed = JSON.parse(value);
          if (!Array.isArray(tagsParsed)) return false;
          return z.array(tagItemSchema).safeParse(tagsParsed).success;
        } catch {
          return false;
        }
      },
      {
        message:
          "Tags must be a valid JSON array of non-empty strings (max 80 characters each).",
      },
    ),
});

const uploadVideoFileSchema = z.object({
  mimetype: z.enum(VIDEO_MIME_TYPES, {
    errorMap: () => ({
      message: `Invalid video format. Only ${VIDEO_MIME_TYPES.join(" and ")} are allowed`,
    }),
  }),

  size: z
    .number({ message: "File size is required" })
    .positive({ message: "File size must be positive" })
    .min(MIN_VIDEO_FILE_SIZE, {
      message: `File size must exceed ${MIN_VIDEO_FILE_SIZE_MB} MB`,
    })
    .max(MAX_VIDEO_FILE_SIZE, {
      message: `File size must not exceed ${MAX_VIDEO_FILE_SIZE_MB} MB`,
    }),
});

const uploadImageFileSchema = z.object({
  mimetype: z.enum(PICTURE_MIME_TYPES, {
    errorMap: () => ({
      message: `Invalid image format. Only ${PICTURE_FORMATS.join(", ")} are allowed`,
    }),
  }),
  size: z
    .number({ message: "File size is required" })
    .positive({ message: "File size must be positive" })
    .min(MIN_PICTURE_FILE_SIZE, {
      message: `File size must exceed ${MIN_PICTURE_FILE_SIZE_LABEL}`,
    })
    .max(MAX_PICTURE_FILE_SIZE, {
      message: `File size must not exceed ${MAX_PICTURE_FILE_SIZE_LABEL}`,
    }),
});

const uploadSubtitleFileSchema = z.object({
  originalname: z
    .string({ message: "Subtitle filename must be a string" })
    .trim()
    .refine(
      (name) => /\.srt$/i.test(name),
      "Only .srt files are allowed for subtitles.",
    ),
});

export const uploadFilmFilesSchema = z.object({
  video: z
    .array(uploadVideoFileSchema)
    .min(1, "No video file provided.")
    .max(1, "Only a single video file is allowed."),

  cover: z
    .array(uploadImageFileSchema)
    .min(1, "A cover image is required.")
    .max(1, "Only a single cover image is allowed."),

  stills: z
    .array(uploadImageFileSchema)
    .min(1, "At least 1 still is required.")
    .max(10, "Maximum 10 stills sont autorisés.")
    .optional(),

  subtitles: z
    .array(uploadSubtitleFileSchema)
    .min(1, "At least 1 subtitle is required.")
    .optional(),
});
