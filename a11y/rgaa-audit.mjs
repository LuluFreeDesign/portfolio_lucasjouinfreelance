/**
 * Tests d'accessibilité automatisés (axe-core) alignés WCAG 2.1 AA / RGAA 4.1.2.
 *
 * Couvre la partie automatisable des critères RGAA (contrastes, alternatives,
 * rôles/états ARIA, structure…). Les critères non automatisables (clavier,
 * langue des passages, citations, contenus cryptiques…) sont audités
 * manuellement dans a11y/RGAA-rapport.md.
 *
 * Prérequis : servir le site en local (ex. `npx serve -l 8765 .`) puis `npm run audit`.
 */
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const BASE = process.env.BASE_URL || 'http://localhost:8765';
const PAGES = [
  '/fr/index.html',
  '/en/index.html',
  '/fr/mentions-legales.html',
  '/en/legal-notice.html',
];
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'];

const browser = await chromium.launch();
const context = await browser.newContext();
let total = 0;

for (const path of PAGES) {
  const page = await context.newPage();
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  // Déplier les accordéons pour auditer aussi leur contenu masqué.
  await page.evaluate(() =>
    document.querySelectorAll('details').forEach((d) => (d.open = true))
  );
  const { violations, passes } = await new AxeBuilder({ page })
    .withTags(TAGS)
    .analyze();

  console.log(`\n=== ${path} — ${violations.length} violation(s) · ${passes.length} tests OK ===`);
  for (const v of violations) {
    console.log(`  [${v.impact}] ${v.id} — ${v.help} (${v.nodes.length})`);
    v.nodes.slice(0, 3).forEach((n) => console.log(`     ↳ ${n.target.join(' ')}`));
  }
  total += violations.length;
  await page.close();
}

await browser.close();
console.log(`\nTotal des violations automatiques : ${total}`);
process.exit(total > 0 ? 1 : 0);
