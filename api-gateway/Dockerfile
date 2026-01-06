FROM node:lts-alpine
WORKDIR /gateway
COPY package*.json ./
RUN npm install
COPY . . 
ENV NODE_OPTIONS=--max-http-header-size=10485760
EXPOSE 6688 
CMD ["node","server"]