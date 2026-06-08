import { updateContentApi } from "../services/CMS/UpdateContentApi";
import saveCmsSection from "./saveCmsSection";

/** Sauvegarde footer : toggles globaux + délégation à saveCmsSection. */
async function saveFooterCmsSection({ page, section, locale, fields, values }) {
  for (const loc of ["fr", "en"]) {
    await updateContentApi({
      page,
      section,
      locale: loc,
      content_key: "social_is_active",
      value: String(values.social_is_active),
      order_index: 999,
      is_active: 1,
    });

    await updateContentApi({
      page,
      section,
      locale: loc,
      content_key: "newsletter_is_active",
      value: String(values.newsletter_is_active),
      order_index: 1000,
      is_active: 1,
    });
  }

  await saveCmsSection({ page, section, locale, fields, values });
}

export default saveFooterCmsSection;
