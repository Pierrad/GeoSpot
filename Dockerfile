FROM node:19.1.0-alpine

WORKDIR /usr/src/web

COPY package*.json /usr/src/web

RUN npm install --include=dev

COPY . /usr/src/web

RUN npm run build

RUN npm install -g serve

EXPOSE 4173

CMD [ "serve", "-s", "dist", "-l", "4173" ]
