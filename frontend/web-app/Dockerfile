FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
# pnpm is pinned to the major that matches pnpm-lock.yaml (lockfileVersion 9). Unpinned
# "latest" now fails the install: pnpm 11+ treats the ignored build scripts of sharp and
# @tailwindcss/oxide as an error.
RUN npm install -g pnpm@10
WORKDIR /app

FROM base AS deps
COPY frontend/web-app/package.json frontend/web-app/pnpm-lock.yaml ./
# devDependencies are needed here: tailwind, postcss and typescript are used by `next build`.
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/web-app ./

# NEXT_PUBLIC_* values are inlined into the bundle by `next build`; setting them as
# runtime environment variables on the container has no effect. These are the addresses
# the *browser* uses, so the defaults match the host ports published by docker-compose.
ARG NEXT_PUBLIC_API_BASE_URL=http://localhost:7001
ARG NEXT_PUBLIC_ID_URL=http://localhost:5003
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_ID_URL=$NEXT_PUBLIC_ID_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm run build

# production image: only the standalone server output
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
# The container runtime sets HOSTNAME to the container/pod name, which would make the
# standalone server bind to that single address instead of all interfaces.
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
