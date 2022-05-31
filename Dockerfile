FROM node:16.15-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

VOLUME config

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3434

CMD [ "npm", "run", "start:prod" ]