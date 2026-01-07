FROM node:20-alpine
WORKDIR /gateway
COPY package*.json ./
RUN npm ci
COPY . .
ENV NODE_OPTIONS=--max-http-header-size=10485760
EXPOSE 8080
CMD ["node", "server.js"]