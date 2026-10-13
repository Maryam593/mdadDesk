# API image for Cloud Run: `gcloud run deploy madaddesk-api --source .`
FROM node:22-slim
WORKDIR /app
COPY package.json package-lock.json ./
COPY api/package.json api/package.json
COPY web/package.json web/package.json
RUN npm ci -w api --ignore-scripts
COPY shared shared
COPY api api
RUN npm run build -w api
ENV NODE_ENV=production
CMD ["node", "api/dist/index.js"]
