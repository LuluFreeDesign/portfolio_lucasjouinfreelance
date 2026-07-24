# Portfolio — Lucas Jouin

Site portfolio de Lucas Jouin, designer numérique freelance (UX/UI & Product) basé à Nantes.

🔗 [https://lulufreedesign.github.io/portfolio_lucasjouinfreelance/](https://lulufreedesign.github.io/portfolio_lucasjouinfreelance/)

## Stack technique

Site statique, sans framework ni étape de build :

- HTML / CSS / JavaScript vanilla
- Police [Space Mono](https://fonts.google.com/specimen/Space+Mono) (Google Fonts)

## Structure

```
.
├── index.html              # redirection vers fr/index.html
├── fr/                     # site en français
│   ├── index.html
│   └── mentions-legales.html
├── en/                     # site en anglais
│   ├── index.html
│   └── legal-notice.html
├── style.css                # styles globaux
├── script.js                 # navigation, accessibilité, interactions
├── assets/                   # images, logos, icônes, favicon
├── a11y/                     # audit d'accessibilité automatisé (RGAA/WCAG)
└── declaration_accessibilité.md
```

## Langues

Le site est disponible en français (langue par défaut, `/fr`) et en anglais (`/en`).

## Développement local

Aucune dépendance ni build requis, il suffit de servir les fichiers statiques :

```bash
npx serve .
```

## Accessibilité

Le site vise une conformité RGAA 4.1.2 / WCAG 2.1 AA. Voir [`declaration_accessibilité.md`](declaration_accessibilité.md) pour l'état de conformité et [`a11y/`](a11y) pour les tests automatisés.

## Déploiement

Le site est hébergé sur GitHub Pages, servi directement depuis la branche `main`.

## Retours

Un [petit formulaire de feedback](https://tally.so/r/yPpAvx) est disponible sur le site pour faire remonter des suggestions.
