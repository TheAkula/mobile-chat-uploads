FROM node as base

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY dist/uploads /app/dist/uploads

RUN yarn install

COPY . .

EXPOSE 5000

