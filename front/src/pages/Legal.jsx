import { useTranslation } from "react-i18next";
import SectionHero from "../components/Legal/SectionHero";
import { isSectionVisible } from "../utils/isVisible";
import useCmsContent from "../hooks/useCmsContent";
import { typeBodySm, typeCaption, typeSectionSubtitle } from "../utils/typography.js";

export default function Legal() {

  // Page et section
  const page = "legal";
  const hero = "hero";

  const { i18n } = useTranslation();
  const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

  const { content, loading } = useCmsContent(page, locale);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">

        {isSectionVisible(content, page, hero) && (
          <SectionHero/>
        )}

        {/* Content */}
        <div className="mt-12 space-y-8">
          {/* Section 1 */}
          <section className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm dark:border-[#FF8C42]/60 dark:bg-white/5">
            <h2 className={typeSectionSubtitle}>Mobile Film Festival</h2>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className={`text-black/50 dark:text-white/50 ${typeCaption} font-semibold uppercase tracking-wider`}>
                  Hébergement
                </dt>
                <dd className={`mt-1 text-black/80 dark:text-white/80 ${typeBodySm}`}>
                  Greenshift – 9, Rue Campagne Première, 75014 Paris, France
                </dd>
              </div>

              <div>
                <dt className={`text-black/50 dark:text-white/50 ${typeCaption} font-semibold uppercase tracking-wider`}>
                  Directeur de publication
                </dt>
                <dd className={`mt-1 text-black/80 dark:text-white/80 ${typeBodySm}`}>
                  Bruno Smadja
                </dd>
              </div>

              <div>
                <dt className={`text-black/50 dark:text-white/50 ${typeCaption} font-semibold uppercase tracking-wider`}>
                  Société
                </dt>
                <dd className={`mt-1 text-black/80 dark:text-white/80 ${typeBodySm}`}>
                  MobilEvent agency
                  <br />
                  4, impasse Truillot, 75011 Paris, France
                </dd>
              </div>

              <div>
                <dt className={`text-black/50 dark:text-white/50 ${typeCaption} font-semibold uppercase tracking-wider`}>
                  Contact
                </dt>
                <dd className={`mt-1 text-black/80 dark:text-white/80 ${typeBodySm}`}>
                  <a
                    className="underline underline-offset-4 hover:opacity-80"
                    href="mailto:support@mobilefilmfestival.com"
                  >
                    support@mobilefilmfestival.com
                  </a>
                </dd>
              </div>
            </dl>
          </section>

          {/* Section 2 */}
          <section className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm dark:border-[#FF8C42]/60 dark:bg-white/5">
            <h2 className={typeSectionSubtitle}>La Plateforme (Marseille)</h2>

            <p className={`mt-3 text-black/70 dark:text-white/70 ${typeBodySm}`}>
              Projet réalisé dans le cadre d’un travail pédagogique encadré par
              La Plateforme, école des métiers du numérique à Marseille.
            </p>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className={`text-black/50 dark:text-white/50 ${typeCaption} font-semibold uppercase tracking-wider`}>
                  Établissement
                </dt>
                <dd className={`mt-1 text-black/80 dark:text-white/80 ${typeBodySm}`}>
                  La Plateforme — École du numérique
                </dd>
              </div>

              <div>
                <dt className={`text-black/50 dark:text-white/50 ${typeCaption} font-semibold uppercase tracking-wider`}>
                  Localisation
                </dt>
                <dd className={`mt-1 text-black/80 dark:text-white/80 ${typeBodySm}`}>
                  Marseille, France
                </dd>
              </div>
            </dl>

            <div className={`mt-6 text-black/50 dark:text-white/50 ${typeCaption}`}>
              *Les informations ci-dessus peuvent être complétées/ajustées selon
              les mentions officielles de l’établissement.
            </div>
          </section>

          {/* Section 3 */}
          <section className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm dark:border-[#FF8C42]/60 dark:bg-white/5">
            <h2 className={typeSectionSubtitle}>Festival MarsAI</h2>

            <p className={`mt-3 text-black/70 dark:text-white/70 ${typeBodySm}`}>
              MarsAI est une plateforme et un événement autour de la narration
              générative. Cette page regroupe les informations légales et
              contacts liés au projet.
            </p>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className={`text-black/50 dark:text-white/50 ${typeCaption} font-semibold uppercase tracking-wider`}>
                  Nom du projet
                </dt>
                <dd className={`mt-1 text-black/80 dark:text-white/80 ${typeBodySm}`}>
                  MarsAI
                </dd>
              </div>

              <div>
                <dt className={`text-black/50 dark:text-white/50 ${typeCaption} font-semibold uppercase tracking-wider`}>
                  Contact
                </dt>
                <dd className={`mt-1 text-black/80 dark:text-white/80 ${typeBodySm}`}>
                  <span className="text-black/60 dark:text-white/60">
                    (à renseigner)
                  </span>
                </dd>
              </div>
            </dl>

            <div className={`mt-6 text-black/50 dark:text-white/50 ${typeCaption}`}>
              contact@marsai.io
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
