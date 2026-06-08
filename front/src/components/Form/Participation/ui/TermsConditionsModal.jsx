import ModalShell from "./ModalShell.jsx";
import { typeAdminSection } from "../../../../utils/typography.js";

export default function TermsConditionsModal({ open, title, onClose }) {
  return (
    <ModalShell open={open} title={title} onClose={onClose} wide>
      <div className="max-h-[70vh] overflow-auto text-sm leading-7 text-neutral-700">
        <h3 className={`text-neutral-900 ${typeAdminSection}`}>1) Objet</h3>
        <p className="mt-2">
          MarsAI est un festival amateur international de courts métrages réalisés
          avec l’aide d’outils d’intelligence artificielle. Les œuvres soumises ne
          doivent pas dépasser 60 secondes.
        </p>

        <h3 className={`mt-6 text-neutral-900 ${typeAdminSection}`}>2) Éligibilité</h3>
        <p className="mt-2">
          La participation est ouverte aux réalisateurs du monde entier. Vous
          confirmez avoir au moins 18 ans au moment de la soumission, ou disposer
          d’une autorisation parentale/légale si applicable.
        </p>

        <h3 className={`mt-6 text-neutral-900 ${typeAdminSection}`}>
          3) Droits & propriété
        </h3>
        <p className="mt-2">
          Vous garantissez être titulaire des droits nécessaires sur la vidéo, la
          musique, les voix, les images et tout élément apparaissant dans l’œuvre.
          Vous êtes responsable de toute réclamation de tiers.
        </p>

        <h3 className={`mt-6 text-neutral-900 ${typeAdminSection}`}>4) Contenu autorisé</h3>
        <p className="mt-2">
          Sont interdits : contenus illégaux, haineux, diffamatoires, harcèlement,
          pornographie explicite, incitation à la violence, atteinte aux droits
          d’auteur, ou toute exploitation non consentie de l’image d’autrui.
        </p>

        <h3 className={`mt-6 text-neutral-900 ${typeAdminSection}`}>
          5) Utilisation par le festival
        </h3>
        <p className="mt-2">
          En soumettant votre œuvre, vous autorisez MarsAI à diffuser l’œuvre dans
          le cadre du festival (en ligne / projections), et à utiliser des
          extraits, images fixes, titre, synopsis et crédits à des fins de
          communication et promotion (site, réseaux sociaux, presse), sans
          rémunération supplémentaire.
        </p>

        <h3 className={`mt-6 text-neutral-900 ${typeAdminSection}`}>
          6) Données personnelles
        </h3>
        <p className="mt-2">
          Les informations collectées servent uniquement à la gestion des
          candidatures, à la communication liée au festival et au contact des
          participants. Vous pouvez demander la suppression de vos données selon
          la politique de confidentialité.
        </p>

        <h3 className={`mt-6 text-neutral-900 ${typeAdminSection}`}>
          7) Modération / refus
        </h3>
        <p className="mt-2">
          MarsAI se réserve le droit de refuser une soumission ne respectant pas
          ces règles, ou de retirer un contenu en cas de signalement sérieux.
        </p>

        <h3 className={`mt-6 text-neutral-900 ${typeAdminSection}`}>8) Acceptation</h3>
        <p className="mt-2">
          En cochant la case « J’accepte les conditions d’utilisation », vous
          reconnaissez les avoir lues et acceptées.
        </p>
      </div>
    </ModalShell>
  );
}
