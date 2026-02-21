# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a French government "Document d'Architecture" (DA) form builder - a **desktop-only** Next.js application that allows users to create, edit, and export structured architecture documents. The application uses the DSFR (Système de Design de l'État français) design system and provides a multi-step form interface for capturing comprehensive architecture documentation. **There is no mobile version** — this is an internal tool used on desktop browsers only.

## Key Commands

**Development:**

```bash
pnpm dev          # Start development server on http://localhost:3000
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Architecture

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Design System**: DSFR vanilla (pure HTML/CSS - no React library)
- **Styling**: SASS + inline CSS
- **Diagramming**: Excalidraw (for architecture schema editing)
- **PDF Generation**: @react-pdf/renderer
- **TypeScript**: Strict mode enabled
- **Compiler**: React Compiler enabled

### Data Persistence

- DA documents are stored in **PostgreSQL** via **Drizzle ORM**
- Form data is stored as JSON in the `forms` table
- Access control via `formAccess` table (roles: admin, editor, viewer)
- Auth: NextAuth v5 with ProConnect OIDC + dev credentials fallback

### Access Control Rules

Every authenticated user has **read access to all DA and all versions** by default. The `checkFormAccess()` function never returns `null` — it returns `"viewer"` for any authenticated user without explicit access.

| Action | Who can do it |
|--------|--------------|
| View any DA (readonly) | All authenticated users |
| View any version (readonly) | All authenticated users |
| Download any DA as PDF | All authenticated users |
| Download any version as PDF | All authenticated users |
| View edit logs of any DA | All authenticated users |
| Edit a DA | Admin, or user with explicit `editor` access via `formAccess` |
| Create a named version | Admin, or user with explicit `editor` access via `formAccess` |
| Create a new DA | Admin only |
| Share a DA (manage access) | Admin only |
| Delete a DA | Admin only |
| Delete a version | Admin only |

**Implementation details:**
- `checkFormAccess(formId, userId, isAdmin)` returns `"admin"` | `"editor"` | `"viewer"` (never `null`)
- Admin status comes from `users.isAdmin` field, not from `formAccess` table
- The `formAccess` table stores explicit `editor`/`viewer` grants for non-admin users
- The first user to sign up is automatically promoted to admin

### Application Structure

**Routes:**

- `/` - Home page displaying list of DA documents (app/page.tsx)
- `/da/[id]` - DA form editor with 12-step stepper (app/da/[id]/page.tsx)
  - Uses `id="new"` for creating new documents
- `/view/[id]` - Readonly view of a DA (app/view/[id]/page.tsx)
  - Server component, accessible to all authenticated users (admin, editor, viewer)
  - Displays all 12 cadres sequentially with sidebar navigation
  - Diagrams rendered as PNG images (no Excalidraw editor)
- `/api/export-pdf/[id]` - PDF export endpoint (app/api/export-pdf/[id]/route.ts)

**12-Step Form Structure:**
Each DA has 12 "cadres" (sections), managed as separate components in `app/da/components/`:

1. Projet - Acteurs (Project and stakeholders)
2. Fonctionnalités - Données (Features and data)
3. Contraintes - Volumétrie (Constraints and volume metrics)
4. Exigences Contextuelles (Contextual requirements)
5. Architecture Acteurs (Actor architecture with Excalidraw diagram)
6. Architecture Fonctionnelle (Functional architecture with Excalidraw diagram)
7. Architecture Applicative (Application architecture with Excalidraw diagram)
8. Architecture Technique (Technical architecture with Excalidraw diagram)
9. Serveurs & Composants (Servers and components)
10. Matrices Flux (Flow matrices)
11. Dimensionnement (Sizing/dimensioning)
12. URLs & Annexe (URLs and appendix)

**State Management:**

- Form state is managed with React `useState` in the main form component
- Each cadre component receives `daData` and `setDAData` props to update the global state
- The complete DA data structure is typed in `types/da.types.ts`

**Excalidraw Integration:**

- Cadres 5, 6, 7, 8, and 10 include architecture diagrams
- Each stores both JSON (for editing) and base64 PNG (for display/PDF export)
- The `ExcalidrawSchemaEditor` component (app/da/components/ExcalidrawSchemaEditor.tsx) handles diagram editing
- Template generation utilities are in `utils/excalidrawTemplates.ts`

**Type System:**

- All DA data structures are strictly typed in `types/da.types.ts`
- The main type is `DAData` which contains all 12 cadres plus annexe
- Type path aliases use `@/` prefix (configured in tsconfig.json)

### Key Design Patterns

**Client/Server Split:**

- The main form (`/da/[id]`) is a client component ("use client") for interactivity
- The home page is a server component that reads the filesystem
- PDF generation happens server-side in an API route

**DSFR Usage Guidelines:**

This project uses **vanilla DSFR** (pure HTML/CSS from @gouvfr/dsfr package).

**Workflow for UI modifications (MANDATORY):**

1. **ALWAYS consult the official DSFR documentation** at https://www.systeme-de-design.gouv.fr/ BEFORE any implementation
2. Use existing DSFR components and classes (fr-btn, fr-input, etc.)
3. Propose implementation to user before coding
4. **ALWAYS verify the result in Chrome** (via Claude in Chrome MCP) after modification to ensure correctness

**DSFR structure:**

- CSS: Bundled from node_modules/@gouvfr/dsfr/dist/dsfr.min.css
- JavaScript: Loaded from public/dsfr/ (dsfr.module.min.js)
- Assets: Fonts and icons in public/dsfr/

Use native DSFR classes. Custom CSS (app/dsfr-extensions.css) should be exceptional.

**Dynamic Imports:**

- Excalidraw is loaded dynamically with `next/dynamic` to avoid SSR issues
- Set with `ssr: false` since Excalidraw requires browser APIs

## Important Notes

- **Backend**: PostgreSQL database via Drizzle ORM, NextAuth v5 for authentication
- **French Language**: All UI text, comments, and data structures are in French
- **Government Context**: This follows French government architecture documentation standards (DICT, EBIOS, PCA/PRA, etc.)
- **React Compiler**: The project uses the experimental React Compiler (babel-plugin-react-compiler)

## When Modifying This Project

- Maintain strict TypeScript typing when modifying DA data structures
- Follow DSFR component patterns for UI consistency
- Preserve the 12-step structure when adding features
- Keep JSON serialization in mind - all DA data must be JSON-serializable for file storage
- Test both the form editing flow and PDF export when making changes to data structures

## Development environment

### Chrome MCP (Claude in Chrome)

On utilise l'extension **"Claude in Chrome"** (MCP SDK) pour tester et vérifier le rendu des pages dans Chrome. C'est l'extension la plus fiable et la plus complète.

**Setup par session :**
1. Appeler `mcp__Claude_in_Chrome__tabs_context_mcp` avec `createIfEmpty: true` pour initialiser le contexte
2. Utiliser le `tabId` retourné pour toutes les opérations suivantes

**Outils principaux :**
- `mcp__Claude_in_Chrome__computer` (action: `screenshot`) — Prendre un screenshot de la page
- `mcp__Claude_in_Chrome__get_page_text` — Récupérer le contenu textuel de la page
- `mcp__Claude_in_Chrome__javascript_tool` — Exécuter du JS dans l'onglet
- `mcp__Claude_in_Chrome__navigate` — Naviguer vers une URL
- `mcp__Claude_in_Chrome__read_page` — Lire l'arbre d'accessibilité (DOM structuré)
- `mcp__Claude_in_Chrome__find` — Trouver des éléments par description naturelle
- `mcp__Claude_in_Chrome__read_console_messages` — Lire les messages console (debug)
- `mcp__Claude_in_Chrome__read_network_requests` — Inspecter les requêtes réseau

**Note :** Ne PAS utiliser chrome-devtools-mcp (désinstallé) ni Control Chrome (instable sur macOS).

### Vérification UI

- **Toute modification UI doit être vérifiée dans Chrome** pour s'assurer du bon rendu DSFR
- Utiliser `mcp__Claude_in_Chrome__computer` (screenshot) pour vérification visuelle
- Utiliser `mcp__Claude_in_Chrome__javascript_tool` pour des vérifications DOM ciblées
- Utiliser `mcp__Claude_in_Chrome__read_console_messages` pour détecter les erreurs JS

## Documentation

- DSFR Composants: https://www.systeme-de-design.gouv.fr/version-courante/fr/composants

### Consultation de la doc DSFR

**Utiliser le MCP server `dsfr`** (configuré dans `.mcp.json`) pour consulter la documentation DSFR :

- `mcp__dsfr__list_components` — Lister tous les composants disponibles
- `mcp__dsfr__get_component_doc(name, section)` — Lire la doc d'un composant (sections: `code`, `overview`, `design`, `accessibility`, `demo`)
- `mcp__dsfr__search_components(query)` — Rechercher par mot-clé (nom, classe CSS, description)

La section `code` est la plus utile : elle contient la structure HTML, les classes CSS, et les variantes.

**Note :** Le site systeme-de-design.gouv.fr bloque WebFetch/curl (Cloudflare 403). Le MCP server fournit la même doc en local. Pour les pages non couvertes par le MCP (exemples interactifs, Storybook), utiliser Chrome MCP.

## GitHub Actions — Mode CI (headless)

Quand Claude Code tourne dans GitHub Actions :

- **Pas de Chrome MCP** : les outils Chrome MCP ne sont pas disponibles. Sauter l'étape "vérifier dans Chrome" du workflow DSFR. Le MCP DSFR (`dsfr-mcp`) est disponible en CI.
- **Playwright** : Chromium headless est installé dans le workflow `claude-pr`. Utiliser Playwright pour vérifier l'environnement review (voir section dédiée ci-dessous).
- **Build** : Exécuter `pnpm build` pour valider que le code compile.
- **Lint** : Exécuter `pnpm lint` pour vérifier les erreurs de style.
- **Tests** : Ne PAS lancer `pnpm test:ci` (pas de PostgreSQL dans ce workflow). Les tests tournent automatiquement dans le pipeline CI séparé.
- **Review env** : La branche `feat/claude-*` déclenche automatiquement un déploiement review. Le reviewer humain vérifie visuellement.
- **Itération** : Si un humain commente `@claude` sur la PR avec du feedback, lire attentivement et itérer.
- **Commits** : Utiliser les conventional commits (`feat:`, `fix:`, `chore:`). Référencer le numéro d'issue (`#42`).
- **node_modules** : Ne JAMAIS lire les fichiers dans `node_modules/`. Pour la documentation DSFR, utiliser exclusivement le MCP DSFR (`mcp__dsfr__*`).
- **Créer des fichiers** : Utiliser l'outil `Write` (qui crée les dossiers parents automatiquement). Ne PAS utiliser `mkdir` sauf nécessité absolue.
- **Commandes Bash refusées** : Si une commande bash est refusée par les permissions, ne PAS insister ni essayer de contourner. Utiliser un autre outil (Write, Edit, Read, Glob, Grep) ou signaler le blocage dans un commentaire.

### Vérification de l'environnement review

Quand l'environnement review est déployé, un commentaire `@claude Review :` est automatiquement posté sur la PR avec l'URL de review et l'issue associée. Claude doit vérifier que l'app fonctionne et que les changements de l'issue sont effectifs.

**Approche :** Utiliser Playwright (Chromium headless, pré-installé dans le workflow) pour naviguer dans l'app, pas juste `curl`. Écrire un script Node ad-hoc adapté à l'issue, l'exécuter avec `node script.js`.

**Ce que Claude doit faire :**

1. Lire l'issue source et le diff de la PR pour comprendre quoi vérifier
2. Écrire un script Playwright qui teste les changements spécifiques
3. Exécuter le script et analyser les résultats
4. Si un problème est détecté : corriger le code et pousser
5. Si tout est OK : poster un commentaire confirmant la réussite

**Pattern Playwright pour la vérification review :**

```javascript
const { chromium } = require('playwright');

(async () => {
  const REVIEW_URL = process.env.REVIEW_URL || 'https://...';
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Capturer les erreurs JS
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));

  // 1. Health check
  const health = await page.goto(`${REVIEW_URL}/api/healthz`);
  console.log('Health:', health.status());

  // 2. Dev login
  const csrf = await (await page.goto(`${REVIEW_URL}/api/auth/csrf`)).json();
  await page.goto(`${REVIEW_URL}/api/auth/callback/dev-login`, {
    method: 'POST',
    // Note: utiliser page.request pour les POST
  });
  // Alternative plus simple : passer par le formulaire de login
  await page.goto(`${REVIEW_URL}/api/auth/signin`);
  await page.fill('input[name="email"]', 'admin@test.fr');
  await page.fill('input[name="name"]', 'Admin Dev');
  await page.click('button[type="submit"]');

  // 3. Vérifications avec auth (adapter selon l'issue)
  await page.goto(`${REVIEW_URL}/`);
  console.log('Title:', await page.title());
  await page.screenshot({ path: 'homepage.png', fullPage: true });

  // 4. Résultat
  if (errors.length > 0) {
    console.error('JS errors detected:', errors);
    process.exit(1);
  }
  console.log('All checks passed');
  await browser.close();
})();
```

**Points importants :**
- Adapter le script à chaque issue (ne pas faire un test générique)
- Playwright auto-wait : pas besoin de `waitForSelector`, les actions attendent automatiquement
- Prendre des screenshots en cas d'échec pour le diagnostic
- L'env review a `ENABLE_DEV_LOGIN=true`

La boucle déploiement → vérification → correction est limitée à **3 itérations**. Au-delà, le reviewer humain prend le relais.
