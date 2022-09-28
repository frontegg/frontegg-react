FROM node:latest as build
RUN npx create-react-app --template typescript frontegg-test
ENV CI=true
WORKDIR frontegg-test
COPY index.tsx ./src
COPY App.tsx ./src
COPY App.test.tsx ./src
RUN npm ci
RUN npm install --save @frontegg/react react-router-dom

