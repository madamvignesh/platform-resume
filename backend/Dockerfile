FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "src/server.js"]
