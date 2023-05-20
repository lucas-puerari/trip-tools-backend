FROM node:hydrogen-alpine3.17

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev --ignore-scripts

COPY ./src /app/src
COPY ./.env /app/.env

WORKDIR /app/src

CMD ["npm", "start"]