import LearnMoreInfoCard from "./LearnMoreInfoCard.jsx";
import { LEARN_MORE_ICONS } from "../../pages/learnMoreCopy.js";

function BulletList({ items }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  );
}

export default function LearnMoreCards({ copy }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2">
      <LearnMoreInfoCard title={copy.step1Title} icon={LEARN_MORE_ICONS.step1}>
        <BulletList items={copy.step1Bullets} />
      </LearnMoreInfoCard>

      <LearnMoreInfoCard title={copy.uploadTitle} icon={LEARN_MORE_ICONS.upload}>
        <BulletList items={copy.uploadBullets} />
      </LearnMoreInfoCard>

      <LearnMoreInfoCard title={copy.step3Title} icon={LEARN_MORE_ICONS.step3}>
        <BulletList items={copy.step3Bullets} />
      </LearnMoreInfoCard>

      <div className="flex flex-col gap-5">
        <LearnMoreInfoCard
          title={copy.ceremonyTitle}
          icon={LEARN_MORE_ICONS.ceremony}
        >
          <BulletList items={copy.ceremonyBullets} />
        </LearnMoreInfoCard>

        <LearnMoreInfoCard title={copy.tipsTitle} icon={LEARN_MORE_ICONS.tips}>
          <BulletList items={copy.tipsBullets} />
        </LearnMoreInfoCard>
      </div>
    </div>
  );
}
