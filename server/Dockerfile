FROM node:20-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]
