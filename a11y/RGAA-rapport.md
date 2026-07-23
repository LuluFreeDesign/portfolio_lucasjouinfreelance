# Rapport d'audit RGAA — Portfolio Lucas Jouin

- **Référentiel** : RGAA 4.1.2 (accessibilite.numerique.gouv.fr) — 13 thématiques, 106 critères, 257 tests.
- **Périmètre** : 4 pages — `fr/index.html`, `en/index.html`, `fr/mentions-legales.html`, `en/legal-notice.html`.
- **Méthode** : tests automatisés (axe-core 4.12 exécuté dans un navigateur réel, contrastes inclus, cf. `rgaa-audit.mjs`) + validation du code (html-validate) + **revue experte manuelle** du code pour les critères non automatisables (clavier, langue, structure, contenus cryptiques…).
- **Nature** : auto-évaluation outillée — ce n'est pas un audit certifié par un auditeur RGAA agréé.

## Taux de conformité

| Indicateur | Valeur |
|---|---|
| Critères applicables | **56** |
| Critères conformes | **56** |
| Critères non conformes | **0** |
| **Taux de conformité RGAA** | **100 %** |

> Audit initial : 46 / 55 (**≈ 84 %**). Les **9 non-conformités détectées ont toutes été corrigées** (détail ci-dessous), portant la conformité à **100 %** des critères applicables. (La correction de 8.7 rend 8.8 applicable, d'où 56 critères applicables.)

## Non-conformités détectées — toutes corrigées ✓

| # | Critère | Constat initial | Correctif appliqué | Statut |
|---|---|---|---|:---:|
| 1 | **7.3 / 12.11** Clavier | Lightbox ouvrable uniquement à la souris (`<img>` non focusables). | Images exposées comme boutons (`role="button"`, `tabindex="0"`, Entrée/Espace) ; lightbox en `role="dialog" aria-modal`, focus déplacé vers « Fermer » à l'ouverture, piégé dans la boîte, restitué à l'image à la fermeture, `Échap` pour fermer. | ✓ |
| 2 | **8.7** Langue | Avis de Bianca Chong en anglais sur la page FR sans indication. | `lang="en"` ajouté sur le passage. | ✓ |
| 3 | **6.1** Liens explicites | « sur ce lien », « here too »… ; 7 liens « Voir sur LinkedIn » identiques. | `aria-label` explicites sur les liens vidéo Greenly ; `aria-label` « Voir le profil LinkedIn de [Nom] » généré pour chaque avis. | ✓ |
| 4 | **13.5** Contenu cryptique | Note « ***** » (astérisques) sans alternative. | `role="img"` + `aria-label` « Note : 5 sur 5 étoiles » sur chaque note. | ✓ |
| 5 | **8.2** Code valide | `src=""` vide sur l'image de la lightbox. | Attribut `src` retiré du HTML (affecté puis retiré par le JS). | ✓ |
| 6 | **9.2** Landmarks | Pas de `<header>` ; logo hors de toute région. | Logo encapsulé dans un `<header>` (`display: contents`, aucun impact sur la grille). | ✓ |
| 7 | **9.4** Citations | Témoignages en `<p>`. | Convertis en `<blockquote>`. | ✓ |
| 8 | **12.7** Lien d'évitement | Absent. | Lien « Aller au contenu » / « Skip to content » ajouté en tête de page (visible au focus) + déplacement effectif du focus vers `<main id="main" tabindex="-1">`. | ✓ |

## Résultats des tests automatisés (axe-core 4.12)

| Page | Avant | Après |
|---|:---:|:---:|
| `fr/index.html` | 0 violation · 40 tests | **0 violation · 45 tests** |
| `en/index.html` | 0 violation · 40 tests | **0 violation · 44 tests** |
| `fr/mentions-legales.html` | 1 violation · 36 tests | **0 violation · 40 tests** |
| `en/legal-notice.html` | 1 violation · 36 tests | **0 violation · 40 tests** |

## Points forts

- **Contrastes** tous conformes (texte, liens verts, texte grisé) — vérifiés sur le rendu réel.
- **Bouton « Animations du site »** : satisfait le critère 13.8 (mouvement/clignotement contrôlable) et complète `prefers-reduced-motion` ; réglage persistant.
- **Présentation à 100 %** : zoom 200 %, reflow à 320 px sans défilement horizontal, focus visible, information non portée par la couleur seule.
- **Formulaires** (langue, animations) entièrement étiquetés et regroupés.

## Limites

Auto-évaluation (axe-core + revue experte). Un audit RGAA officiel opposable doit être conduit par un·e auditeur·rice sur l'ensemble des 106 critères. Critères écartés comme non applicables : cadres, multimédia, tableaux de données, documents bureautiques externes (ex. PDF de la Cour des comptes hébergé par ccomptes.fr).
