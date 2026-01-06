# ビルドステージ
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 実行ステージ
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# next.config.mjs / next.config.js / next.config.ts のいずれかがあればコピー
COPY --from=builder /app/next.config.* ./

# 必須ファイルだけ確実にコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]