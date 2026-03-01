# Portfolio — Lucas Jouin, Designer numérique freelance

## Description

Portfolio personnel de Lucas Jouin, designer numérique (UX/UI & Product) freelance basé à Nantes.
Site one-page avec une approche écoconçue et accessible (RGAA).

## Structure du projet

```
portfolio_lucasjouinfreelance/
├── index.html              # Page unique du portfolio
├── css/
│   └── style.css           # Styles principaux
├── js/
│   └── main.js             # JavaScript (accordéons, scroll spy, lightbox, toggle animations)
├── assets/
│   ├── svg/
│   │   ├── logo-lucas-jouin.svg   # Logo principal (optimisé, 54 Ko)
│   │   └── gribouilli.svg         # Dessin décoratif bleu (920 octets)
│   └── img/
│       ├── akeneo-1.jpg           # Akeneo — Data Quality Insights
│       ├── akeneo-2.jpg           # Akeneo — Product Quality Score
│       ├── akeneo-3.jpg           # Akeneo — Product Associations
│       ├── greenly-1.jpg          # Greenly — Design System
│       ├── greenly-2.jpg          # Greenly — Dashboard émissions
│       ├── betagouv-1.jpg         # ZLV — Fiche logement
│       ├── betagouv-2.jpg         # ZLV — Modal MÀJ groupée
│       ├── betagouv-3.jpg         # LVAO — Assistant au tri
│       ├── betagouv-4.jpg         # LVAO — Carte économie circulaire
│       ├── photo-plouhinec.jpg    # Photo perso — Plouhinec
│       ├── photo-nantes.jpg       # Photo perso — Nantes
│       ├── photo-lecce.jpg        # Photo perso — Lecce
│       └── logos/
│           ├── g62.svg            # ECV
│           ├── lebocabinet.svg    # Le Bo Cabinet
│           ├── terre-de-liens.svg # Terre de Liens
│           ├── wesuggest.svg      # Wesuggest
│           ├── ministere-agriculture.svg # Ministère Agriculture
│           ├── flexbat.svg        # Flex Bat
│           └── beetween.svg       # Beetween
└── README.md
```

## Architecture & Layout

Layout 3 colonnes en desktop :

| Gauche (sticky) | Centre (scroll) | Droite (sticky) |
|---|---|---|
| Logo (90px) | Contenu principal (max 360px) | Sommaire (ancres) + scores + toggle animations + mentions légales |

- **Fond** : `#292929`
- **Typo** : Space Mono (Google Fonts CDN)
- **Titres sections** : 22px, **contenu** : 16px
- **Espacement** : 16px entre éléments, 32px entre sections
- Seule la colonne centrale scrolle, les colonnes latérales sont sticky.
- Navigation par ancres avec scroll smooth et highlight de la section active.

### Responsive (≤ 1024px)

- Colonne unique : seul le contenu central s'affiche
- Logo et sidebar masqués
- Footer mobile avec : scores, toggle animations, mentions légales

## Sections du contenu (colonne centrale)

1. **Bienvenue chez moi** (`#bienvenue`) — ✅ Accroche + bio + curseur clignotant style Minitel + gribouilli SVG. Photo de Lucas à venir.
2. **On bosse ensemble** (`#projets`) — ✅ 3 accordéons :
   - **Akeneo** : user research, onboarding, produits lancés, IA/UX. 3 images + lightbox.
   - **Greenly** : Lead Product Designer, Design System, refonte plateforme. 2 images + lightbox.
   - **beta.gouv.fr** : Zéro Logement Vacant (NPS, Cour des Comptes, SEO, accessibilité) + Longue vie aux objets (club usager, carte éco circulaire, RGAA 100%). 4 images + lightbox.
   - **7 logos clients** : ECV, Le Bo Cabinet, Terre de Liens, Wesuggest, Ministère Agriculture, Flex Bat, Beetween.
3. **Ma façon de travailler** (`#valeurs`) — ✅ 3 valeurs : Social, Franc, Volontaire. Illustrations à venir.
4. **Ce qu'ils en ont pensé** (`#avis`) — ✅ 6 avis (italic) avec guillemets stylisées, séparateurs *****, noms en gras avec liens LinkedIn.
5. **Pour qui je vote ?** (`#vote`) — ✅ 3 photos perso (Plouhinec, Nantes, Lecce) avec légendes italic.
6. **À votre écoute** (`#rdv`) — ✅ CTA vers cal.com/lucasjouin/appel-de-decouverte
7. **Des questions, des réponses !** (`#faq`) — ✅ 4 questions/réponses avec `<details>` + easter egg IA/Bretagne.

## Sidebar droite

- **Sommaire** : liens ancres vers chaque section (scroll spy actif)
- **Score écoconception** : à calculer
- **Score RGAA** : à calculer
- **Toggle animations** : active/désactive toutes les animations (synced sidebar + footer)
- **Mentions légales** : lien (à fournir)

## Fonctionnalités JS

- [x] Scroll spy (Intersection Observer) — highlight du lien actif dans la sidebar
- [x] Navigation par ancres avec scroll smooth
- [x] Accordéons accessibles (aria-expanded, aria-controls)
- [x] Toggle animations (respecte aussi `prefers-reduced-motion`, synced sidebar/footer)
- [x] Lightbox modale (moniteur style, fermeture ×/Escape/overlay)

## État d'avancement

### ✅ Fait
- Squelette HTML complet avec tout le contenu textuel
- Layout CSS 3 colonnes avec sticky (logo 90px, centre 360px, sidebar 260px)
- Typographie Space Mono (Google Fonts CDN)
- JavaScript : accordéons, scroll spy, toggle animations, lightbox
- Logo SVG optimisé + gribouilli SVG
- 9 images projets (Akeneo ×3, Greenly ×2, beta.gouv ×4)
- 7 logos clients SVG
- 3 photos personnelles
- 6 avis clients avec liens LinkedIn
- FAQ 4 questions/réponses
- Section RDV avec lien Cal.com
- Accessibilité : aria, focus-visible, sr-only, prefers-reduced-motion
- Responsive basique (≤ 1024px : colonne unique + footer mobile)

### 🔲 En attente de contenu
- [ ] Photo de Lucas (section Bienvenue)
- [ ] Illustrations valeurs (Social, Franc, Volontaire)
- [ ] Mentions légales (texte)
- [ ] URLs réels des liens dans les accordéons (actuellement `href="#"`)

### 🔲 À faire (technique)
- [ ] Calcul score écoconception
- [ ] Calcul score RGAA
- [ ] Responsive mobile : affinage complet
- [ ] Optimisation images (compression, formats modernes)
- [ ] Animations & effets visuels (à détailler)
- [ ] Déploiement

## Technologie

HTML / CSS / JavaScript vanilla — pas de framework, pour l'écoconception et la légèreté.

## Repo

`https://github.com/LuluFreeDesign/portfolio_lucasjouinfreelance.git`
