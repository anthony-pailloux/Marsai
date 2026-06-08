# Pull Request — anthony-pailloux → main

**Créer la PR :** https://github.com/anthony-pailloux/Marsai/compare/main...anthony-pailloux

---

## Titre

```
Simplification code pour débutants — refactors, validation partagée et UI harmonisée
```

---

## Corps (copier-coller dans GitHub)

```markdown
## Summary

- Refactor du front et du back pour rendre le code plus lisible par un débutant : découpage en hooks (`use*`), composants UI (`*Parts`, `*Table`, sections) et utils, sans changement fonctionnel volontaire.
- Centralisation des schémas Zod dans `shared/validation/` (film, partner, event, user) avec re-exports front/back et scripts de test.
- Harmonisation UI publique (Home, Events, Jury, Gallery, Footer) via `homeCardStyles.js` et icônes brand.
- Nettoyage scripts démo (suppression Python one-shot, `seed:demo` MySQL uniquement).

## Architecture ajoutée

```
shared/validation/          ← source unique Zod
front/src/hooks/use*.js       ← logique état + API
front/src/components/...      ← UI découpée
back/src/services/*.service.js ← emails, helpers upload
```

**Install requis après clone :**
```bash
cd shared && npm install
cd ../back && npm install
cd ../front && npm install
```

## Zones refactorées (principales)

| Zone | Pattern |
|------|---------|
| Participation | `VideoUploadForm`, `DirectorForm`, `TeamCompositionForm` → hooks + validation |
| Admin | Events, Users, Overview, Messages, Videos, Leaderboard, Jury, Newsletter |
| Public | `Events.jsx` → sections + `useEventsPage` |
| Validation | `shared/validation/*` + `test:film-validation` + `test:shared-validation` |
| Contact admin | `contactReplyEmail.service.js` |

## Tests automatisés

```bash
cd back && npm run test:film-validation    # 5/5
cd back && npm run test:shared-validation  # 6/6
cd front && npm run build                  # OK
```

## Test plan

- [ ] Home : sections, hero, footer, dark mode
- [ ] Events : programme par jour, ateliers, réservation `BookingModal`
- [ ] Participation : 3 étapes, validation Zod, upload fichiers
- [ ] Admin : CRUD jury, leaderboard, users (rôles/suppression), vidéos, messages contact
- [ ] Auth : login, register dashboard, reset password (si SMTP configuré)
- [ ] `npm run seed:demo` (BDD) avec assets déjà dans `back/uploads/`

## Notes

- Comportement upload vidéo : validation front alignée sur le back via `shared/validation/filmValidationSchema.js`.
- Les scripts Python de génération d’assets ont été retirés ; les images démo doivent être versionnées ou copiées manuellement.
- Refactors CMS lourds (`FooterForm`, `AdminConferenceProgram`) volontairement laissés pour plus tard.
```
