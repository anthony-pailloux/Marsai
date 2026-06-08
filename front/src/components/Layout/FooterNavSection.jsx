import { Link } from "react-router";
import { typeFooterHeading, typeFooterLink } from "../../utils/typography.js";

export default function FooterNavSection({
  navTitle,
  navLinks,
  legalTitle,
  legalLinks,
}) {
  return (
    <div className="min-w-0 md:col-span-1 lg:col-span-2">
      <div className="flex flex-col items-center gap-y-6 sm:flex-row sm:justify-center sm:gap-x-24 md:gap-x-32 lg:gap-x-40">
        <div className="min-w-0">
          <h3 className={`text-brand ${typeFooterHeading}`}>{navTitle}</h3>
          <ul className={`mt-3 space-y-2.5 ${typeFooterLink}`}>
            {navLinks.map((link) => (
              <li key={link.to + link.label}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <h3 className={`text-brand ${typeFooterHeading}`}>{legalTitle}</h3>
          <ul className={`mt-3 space-y-2.5 ${typeFooterLink}`}>
            {legalLinks.map((link) => (
              <li key={link.to + link.label}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
