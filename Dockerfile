FROM node:hydrogen-alpine3.17

WORKDIR /app

RUN npm upgrade

COPY package*.json ./
RUN npm install --omit=dev --ignore-scripts

COPY ./src /app/src
COPY ./.env /app/.env

WORKDIR /app/src

ENV ENVIRONMENT local
ENV NODE_ENV local

EXPOSE 3000

CMD ["npm", "start"]