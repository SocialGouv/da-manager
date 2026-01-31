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
- DA documents are stored as JSON files in `public/da/{id}.json`
- The DA index is maintained in `public/da/index.json`
- This is a **file-based system** with no database - all data operations use the filesystem

### Application Structure

**Routes:**
- `/` - Home page displaying list of DA documents (app/page.tsx)
- `/formulaire/[id]` - DA form editor with 12-step stepper (app/formulaire/[id]/page.tsx)
  - Uses `id="new"` for creating new documents
  - Loads existing documents from `/da/{id}.json`
- `/api/export-pdf/[id]` - PDF export endpoint (app/api/export-pdf/[id]/route.ts)

**12-Step Form Structure:**
Each DA has 12 "cadres" (sections), managed as separate components in `app/formulaire/components/`:
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
- The `ExcalidrawSchemaEditor` component (app/formulaire/components/ExcalidrawSchemaEditor.tsx) handles diagram editing
- Template generation utilities are in `utils/excalidrawTemplates.ts`

**Type System:**
- All DA data structures are strictly typed in `types/da.types.ts`
- The main type is `DAData` which contains all 12 cadres plus annexe
- Type path aliases use `@/` prefix (configured in tsconfig.json)

### Key Design Patterns

**Client/Server Split:**
- The main form (`/formulaire/[id]`) is a client component ("use client") for interactivity
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

- **No Backend**: This application has no server-side database or API backend beyond Next.js routes
- **File Operations**: DA creation/updates would need filesystem write operations (not yet implemented in the current codebase)
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
- We use Google Chrome MCP to access, read and test web pages
- **All UI modifications must be verified in Chrome MCP** to ensure they render correctly with DSFR

## Documentation
- DSFR Componants: https://www.systeme-de-design.gouv.fr/version-courante/fr/composants
