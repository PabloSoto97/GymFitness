# Usamos Node para construir
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npm run build

# 👇 Genera el cliente de Prisma
RUN npx prisma generate

# -------------------------------
# Runtime: imagen final
# -------------------------------
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

# Necesario para Prisma con PostgreSQL
RUN npm install --omit=dev

EXPOSE 8080

CMD ["node", "dist/server.js"]
