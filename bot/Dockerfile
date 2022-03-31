FROM node:16.13.2

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm i
RUN npm run build

EXPOSE 5000

CMD [ "npm", "run", "start:prod" ]

