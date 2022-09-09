FROM node as base

WORKDIR /app

COPY package*.json .

FROM base as dev

RUN npm install

COPY . .

EXPOSE 4000

FROM base as prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm install

COPY . .

COPY --from=dev /app-uploads/dist /app-uploads/dist

CMD ["node", "dist/main"]