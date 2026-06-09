# Guide des patterns de code MarsAI

Ce guide résume **comment le code est organisé** après la simplification (phases 1 à 9).  
Objectif : qu'un débutant sache **où chercher** et **comment ajouter une fonctionnalité** sans tout relire.

---

## 1) Structure globale

```
front/src/
  pages/          → pages (routes), souvent légères
  hooks/          → logique réutilisable (use*)
  components/     → UI découpée en petits morceaux
  services/       → appels API (fetch)
  utils/          → fonctions pures (pas de React)

back/src/
  routes/         → définition des URLs
  controllers/    → réception HTTP, renvoie la réponse
  services/       → logique métier
  models/         → requêtes SQL
  zodSchema/      → validation entrées API

shared/validation/ → schémas Zod partagés front + back
```

**Règle simple** : la page affiche, le hook décide, le composant dessine, le service appelle l'API.

---

## 2) Formulaires CMS (admin → contenu du site)

### Pattern standard

1. **`*FormConfig.js`** — liste des champs, valeurs par défaut, constantes `PAGE` / `SECTION`
2. **Composant formulaire** — utilise `useCmsSectionForm`
3. **Sous-composants** — un bloc UI par zone (ex. `ConceptFormCardEditor.jsx`)

Exemples déjà en place :

| Section | Config | Composant principal |
|---------|--------|---------------------|
| Concept Home | `conceptFormConfig.js` | `SectionConceptForm.jsx` |
| Hero Home | `heroFormConfig.js` | `SectionHeroForm.jsx` + `SectionHeroFormBody.jsx` |
| Programme Home | `eventsFormConfig.js` | `SectionEventsForm.jsx` + `EventsFormCardEditor.jsx` |
| Clôture Home | `closingEventFormConfig.js` | `SectionClosingEventForm.jsx` |
| Localisation Home | `localisationEventFormConfig.js` | `SectionLocalisationEventForm.jsx` |
| Footer | `footerFormConfig.js` | `FooterForm.jsx` |

### Hook `useCmsSectionForm`

Centralise :

- chargement du contenu CMS depuis la BDD (`useCmsContent`)
- remplissage du formulaire (`buildInitialValuesFromCms`)
- sauvegarde (`saveCmsSection`)

```jsx
const { values, handleChange, submitLoading, handleSubmit } = useCmsSectionForm({
  page: "home",
  section: "concept",
  fields: CONCEPT_FIELDS,
  defaultValues: CONCEPT_DEFAULT_VALUES,
  forcedLocale,
  successMessage: "Section Concept mise à jour",
});
```

### Ajouter une nouvelle section CMS

1. Créer `maSectionFormConfig.js` (champs + defaults)
2. Créer le formulaire avec `useCmsSectionForm`
3. Enregistrer la section dans `CmsCentralization.js` (menu admin CMS)
4. Tester sauvegarde FR + EN si applicable

---

## 3) Pages admin (événements, users, overview…)

### Pattern standard

```
Page.jsx          → layout + branchement hook
useMaPage.js      → état, filtres, handlers
*Content.jsx      → affichage liste / tableau
*Modal.jsx        → formulaire modal
*Crud.js          → fonctions pures (payload API, save, delete)
```

Exemples :

| Zone | Hook | Logique extraite |
|------|------|------------------|
| Événements admin | `useAdminEvents.js` | `adminEventsCrud.js` |
| Utilisateurs | `useDashboardUsers.js` | `dashboardUserConstants.js` |
| Overview | `useOverviewData.js` | `overviewUtils.js` |

**Pourquoi séparer le CRUD ?** Le hook reste lisible ; les fonctions dans `*Crud.js` sont testables et réutilisables sans React.

---

## 4) Participation (upload film)

Découpage en 3 étapes, chacune avec son hook / composants :

| Étape | Hook / utils | Composants |
|-------|--------------|------------|
| Réalisateur | `useDirectorForm.js` | `DirectorIdentityFields`, `DirectorContactFields` |
| Équipe | `useTeamCompositionForm.js` | `TeamCompositionForm.jsx` |
| Vidéo | `videoUploadFormConfig.js`, `videoUploadDraft.js` | `VideoUploadFields.jsx` |

Validation partagée : `shared/validation/filmValidationSchema.js` (front + back).

---

## 5) Validation partagée (`shared/`)

Les schémas Zod dans `shared/validation/` sont utilisés **des deux côtés** pour éviter les divergences.

| Schéma | Usage |
|--------|-------|
| `filmValidationSchema.js` | Upload participation |
| `userValidationSchema.js` | Register, login, reset password |
| `eventValidationSchema.js` | Événements admin |
| `partnerValidationSchema.js` | Partenaires CMS |

Tests automatiques (depuis `back/`) :

```bash
npm run test:film-validation
npm run test:shared-validation
```

---

## 6) Backend : contrôleur léger

Un bon contrôleur :

1. Lit `req.body` / `req.params`
2. Valide avec Zod
3. Appelle un **service**
4. Renvoie `res.status(...).json(...)`

La logique métier et le SQL restent dans `services/` et `models/`.

**Ne pas modifier sans raison** : `back/src/models/videos.model.js`, `back/src/models/newsletter.model.js` (fichiers sensibles / volumineux).

---

## 7) Notifications (toasts)

Système global dans `front/src/utils/toast.js` + `ToastHost` (monté dans `App.jsx`).

```js
import { toast } from "../utils/toast.js";

toast.success("Enregistré");  // disparaît après 4 s
toast.error("Erreur");        // disparaît après 6 s
toast.info("Information");
```

| Zone | Pattern |
|------|---------|
| Toute l'app (CMS, admin, auth, contact, newsletter…) | **Toast uniquement** via `toast.success` / `toast.error` |
| Erreurs de champ (validation Zod) | Inline sous le champ concerné (ex. `FaqFieldError`) |
| Flux majeurs (upload film réussi) | Modal dédiée + toast pour les erreurs |
| Suppressions | `ConfirmDialog` (pas `window.confirm`) |

Formulaires CMS : utiliser `CmsSubmitFooter` (bouton seul — le hook affiche le toast automatiquement).

---

## 8) Tests avant de pousser

Checklist minimale :

```bash
# Depuis back/
npm run test:film-validation
npm run test:shared-validation
npm run smoke:test          # login, rôles, events, CMS (API)

# Depuis front/
npm run build
```

`smoke:test` nécessite l’API sur `localhost:3000` et les comptes seed (`npm run seed:users`).

Smoke test **manuel** (UI) recommandé en plus :

- [ ] Home : sections, hero, dark mode
- [ ] Login : 3 rôles + redirections
- [ ] Participation : 3 étapes (réalisateur → équipe → upload)
- [ ] Admin events : créer / éditer / publier
- [ ] CMS admin : sauvegarder Concept + Hero

---

## 9) Comptes de test locaux

```bash
cd back
npm run seed:users
```

Détails : `docs/comptes-test.md`

---

## 10) Git en équipe

Workflow branches + PR : `docs/guide_GIT_workflow.md`

---

## 11) Quand refactorer (et quand s'arrêter)

**Refactorer** si :

- un fichier dépasse ~200 lignes **et** tu dois le modifier souvent
- la même logique est copiée 3 fois ou plus
- un débutant ne trouve pas où ajouter sa feature

**Ne pas refactorer** si :

- le code fonctionne et n'est touché qu'une fois par an
- le changement est « plus joli » sans gain de compréhension
- les tests auto ne courent pas encore le parcours concerné

Les phases 1 à 10 ont uniformisé les formulaires CMS Home. Priorité maintenant : **stabilité**, **tests**, **petites features**.
