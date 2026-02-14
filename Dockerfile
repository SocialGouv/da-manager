# Dockerfile optimisé pour DA Formulaire (Next.js 16 + pnpm)

# Stage 1: Dependencies
FROM node:22-alpine AS deps
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copier les fichiers de configuration des dépendances
COPY package.json pnpm-lock.yaml ./

# Installer les dépendances de production et de dev
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:22-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copier les dépendances depuis le stage précédent
COPY --from=deps /app/node_modules ./node_modules

# Copier le code source
COPY . .

# Variables d'environnement pour le build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# NextAuth URL (injectée au build pour le callback OAuth)
ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL

# Build de l'application
RUN pnpm build

# Stage 3: Runner (image finale légère)
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Créer un utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copier les fichiers publics nécessaires
COPY --from=builder /app/public ./public

# Copier les fichiers standalone de Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Créer le répertoire pour les DA documents avec les bonnes permissions
RUN mkdir -p /app/public/da && \
    chown -R nextjs:nodejs /app/public/da

USER 1001

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
