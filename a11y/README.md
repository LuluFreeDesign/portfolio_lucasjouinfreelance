# Accessibilité — RGAA 4.1.2

Tests d'accessibilité du portfolio, alignés WCAG 2.1 AA / RGAA 4.1.2.

## Contenu

- **`RGAA-rapport.md`** — rapport d'audit complet (taux de conformité, grille par critère, non-conformités et correctifs).
- **`rgaa-audit.mjs`** — tests automatisés (axe-core via Playwright) sur les 4 pages.

## Lancer les tests automatisés

```bash
# 1. servir le site à la racine du dépôt
npx serve -l 8765 .

# 2. dans un autre terminal, depuis a11y/
cd a11y
npm install
npx playwright install chromium
npm run audit
```

Le script sort en code 1 si des violations sont détectées (intégrable en CI).
Variable optionnelle : `BASE_URL` (défaut `http://localhost:8765`).

## Portée

Les tests automatisés couvrent la partie automatisable des critères RGAA
(contrastes, alternatives, ARIA, structure…). Les critères nécessitant un
jugement humain (navigation clavier, langue des passages, citations,
contenus cryptiques…) sont audités manuellement dans `RGAA-rapport.md`.
