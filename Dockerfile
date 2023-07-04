FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN yarn 
COPY / ./

EXPOSE 4000

CMD ["node", "index.js"]