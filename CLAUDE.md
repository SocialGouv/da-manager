# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a French government "Document d'Architecture" (DA) form builder - a Next.js application that allows users to create, edit, and export structured architecture documents. The application uses the DSFR (Système de Design de l'État français) design system and provides a multi-step form interface for capturing comprehensive architecture documentation.

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
4. **ALWAYS verify the result in Chrome MCP** after modification to ensure correctness

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

### Chrome DevTools MCP (chrome-devtools-mcp)

On utilise `chrome-devtools-mcp` pour tester et vérifier le rendu des pages dans Chrome.

**Prérequis : L'utilisateur doit lancer Chrome avec le profil de debug AVANT la session Claude Code.**

```bash
# Lancer Chrome avec remote debugging activé (profil dédié MCP)
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 \
  --user-data-dir="$HOME/.chrome-mcp-profile" \
  --no-first-run --no-default-browser-check &
```

**⚠️ IMPORTANT — Profil dédié MCP (`~/.chrome-mcp-profile`) :**
- Chrome 136+ exige `--user-data-dir` pour activer le remote debugging
- Utiliser un profil **séparé et léger**, dédié uniquement au debug MCP (`~/.chrome-mcp-profile`)
- Ne PAS réutiliser le profil de navigation quotidien (trop d'onglets → timeout MCP)
- Ce profil persiste les sessions de login entre les redémarrages
- Si le profil accumule trop d'onglets (>5), le supprimer et relancer : `rm -rf ~/.chrome-mcp-profile`

**Alias recommandé** (à ajouter dans `~/.zshrc`) :
```bash
alias chrome:debug='/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --user-data-dir="$HOME/.chrome-mcp-profile" --no-first-run --no-default-browser-check > /dev/null 2>&1 &'
```

**Vérification de la connexion :**
```bash
curl -s http://127.0.0.1:9222/json/version
# Doit retourner du JSON avec la version de Chrome
```

**En cas de problème de connexion MCP (timeout) :**
1. Vérifier que Chrome tourne avec le bon port : `curl -s http://127.0.0.1:9222/json/version`
2. Si pas de réponse → Chrome n'est pas lancé avec le bon flag. Le fermer (`pkill -9 "Google Chrome"`) et relancer avec la commande ci-dessus
3. Si timeout malgré la réponse JSON → trop d'onglets ouverts. Supprimer le profil : `rm -rf ~/.chrome-mcp-profile` et relancer
4. Ne JAMAIS lancer Chrome via `open -a` (les flags ne passent pas correctement)
5. Tuer les processus zombies si nécessaire : `pkill -f "chrome-devtools-mcp"`

### Vérification UI

- **All UI modifications must be verified in Chrome MCP** to ensure they render correctly with DSFR
- Utiliser `mcp__chrome-devtools__take_screenshot` pour vérifier le rendu visuel
- Utiliser `mcp__chrome-devtools__take_snapshot` pour inspecter l'arbre d'accessibilité

## Documentation

- DSFR Componants: https://www.systeme-de-design.gouv.fr/version-courante/fr/composants
