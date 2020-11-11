FROM node:12-alpine


RUN apk update
RUN apk add git

WORKDIR /usr/src/app

COPY ./src ./src
COPY ./public ./public
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json


RUN npm i

RUN npm run build


