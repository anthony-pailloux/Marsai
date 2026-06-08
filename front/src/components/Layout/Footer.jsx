import Newsletter from "../Form/Newsletter";
import useFooterContent from "../../hooks/useFooterContent.js";
import FooterBrandSection from "./FooterBrandSection.jsx";
import FooterNavSection from "./FooterNavSection.jsx";
import FooterBottomBar from "./FooterBottomBar.jsx";

function Footer() {
  const {
    t,
    content,
    page,
    section,
    sectionData,
    loading,
    logoSrc,
    social,
    navLinks,
    legalLinks,
  } = useFooterContent();

  if (loading) return null;

  return (
    <footer className="flex w-full flex-col border-t border-black/10 bg-[#F5F6F8] text-black dark:border-[#FFFFFF]/60 dark:bg-black dark:text-white md:flex-row">
      <div className="mx-auto flex w-full flex-col px-6 py-5 md:px-8 md:py-6">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <FooterBrandSection
            content={content}
            page={page}
            section={section}
            logoSrc={logoSrc}
            social={social}
          />

          <FooterNavSection
            navTitle={
              sectionData.sections_navigation || t("sections.navigation")
            }
            navLinks={navLinks}
            legalTitle={sectionData.sections_legal}
            legalLinks={legalLinks}
          />

          <div className="flex min-w-0 md:col-span-2 lg:col-span-1 md:justify-start lg:justify-end">
            <div className="max-w-105 md:max-w-150">
              <Newsletter />
            </div>
          </div>
        </div>

        <FooterBottomBar t={t} />
      </div>
    </footer>
  );
}

export default Footer;
