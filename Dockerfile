FROM node:18-bullseye AS builder

ENV NODE_ENV development

WORKDIR /app/campfire-web

COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .

EXPOSE 8080

CMD [ "yarn", "start" ]
