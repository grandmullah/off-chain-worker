FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN yarn 
COPY . ./

RUN ls 
RUN pwd

EXPOSE 4000

CMD ["node", "index.js"]