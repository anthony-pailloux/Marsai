---
name: simplify-review
description: >-
  Reviews code to simplify it for beginners without breaking existing behavior.
  Use when the user asks for a code review focused on readability, simplification
  for débutants, reducing complexity, or maintaining features while making code
  easier to understand. Trigger on @simplify-review or mentions of review
  simplification, code lisible débutant, or non-régression.
---

# Review de code — Simplification pour débutant

Mission : **simplifier au maximum le code** pour qu'un débutant le comprenne et le maintienne, **sans modifier le comportement** ni casser les fonctionnalités existantes.

## Règles absolues (non négociables)

1. **Zéro régression** : mêmes entrées → mêmes sorties, mêmes routes, validations et erreurs utilisateur.
2. **Pas de refactor "artistique"** : ne touche pas à ce qui fonctionne déjà et est lisible.
3. **Changements minimaux** : une simplification = un petit diff ciblé, pas une réécriture globale.
4. **Conserver les conventions du projet** : noms, structure des dossiers, style existant.
5. **Ne pas ajouter** de librairies, patterns avancés ou abstractions "pour le futur".

## Workflow

1. Lire le code ciblé (`@fichier` ou `@dossier/`) et les fichiers liés si nécessaire.
2. Résumer le comportement actuel avant toute suggestion.
3. Identifier les points de friction pour un débutant.
4. Proposer des simplifications par priorité avec risque de régression.
5. Marquer explicitement ce qu'il ne faut pas toucher.
6. Produire la sortie au format obligatoire ci-dessous.

## Analyse (dans cet ordre)

1. **Comportement actuel** : flux, données, effets de bord (3–5 phrases).
2. **Points de friction** : noms obscurs, imbrications, logique dispersée, duplication, magic numbers, async confus.
3. **Simplifications possibles** (par priorité) :
   - Renommer pour clarifier
   - Extraire une petite fonction avec un nom explicite
   - Réduire l'imbrication (early return, variables intermédiaires)
   - Fusionner duplication évidente
   - Commenter uniquement la logique métier non évidente
4. **Ne pas toucher** : auth, uploads, SQL, état partagé, intégrations externes, parties fragiles.

## Interdictions

- Changer l'API publique (routes, props, signatures exportées) sans le signaler clairement
- "Optimiser" ou réarchitecturer sans demande explicite
- Remplacer par des patterns avancés (HOC, factories, génériques complexes, hooks custom inutiles)
- Supprimer des validations ou du error handling "pour alléger"

## Format de sortie obligatoire

### 1. Résumé (2–3 phrases)
Comportement actuel + niveau de complexité (faible / moyen / élevé).

### 2. Tableau des simplifications

| Priorité | Fichier | Problème | Simplification proposée | Risque régression | Effort |
|----------|---------|----------|-------------------------|-------------------|--------|
| 🔴 Haute | ... | ... | ... | Faible / Moyen / Élevé | S / M / L |

### 3. Plan d'action (max 5 étapes)
Du plus sûr au plus risqué.

### 4. Exemples avant / après
Uniquement pour les suggestions **haute priorité** :
- Minimum de lignes changées
- 1 phrase expliquant pourquoi c'est plus simple pour un débutant

### 5. Checklist de non-régression

```
- [ ] Cas nominal : ...
- [ ] Cas erreur : ...
- [ ] Cas limite : ...
```

### 6. Verdict
- ✅ Prêt à simplifier tel quel
- ⚠️ Simplifiable avec précautions (préciser lesquelles)
- 🛑 Ne pas simplifier maintenant (expliquer pourquoi)

## Mode application (si l'utilisateur demande d'appliquer)

- Appliquer **uniquement** les changements à risque **Faible**, sauf demande explicite contraire.
- Après chaque modification : 1 phrase sur ce qui change et ce qui reste identique.
- Ne pas toucher aux parties marquées "Ne pas toucher".
- Priorité : **lisibilité > moins de lignes**. Pas de refactor global.

## Ton

Pédagogique, direct, sans jargon inutile. Si un terme technique est nécessaire, définir en une ligne.

## Variantes selon le contexte

**Un seul fichier** : review ciblé, format complet, pas de refactor global.

**Un dossier / feature** : review par fichier, puis synthèse globale et plan d'action ordonné.

**Un diff / PR** : signaler ce qui complique inutilement ET ce qui est déjà assez simple (ne pas sur-simplifier).
