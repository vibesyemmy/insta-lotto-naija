FROM node:10.13.0-alpine

EXPOSE 3000

RUN adduser -S app

ENV HOME=/home/app

COPY package.json $HOME/src/
RUN chown -R app $HOME/*

WORKDIR $HOME/src

USER root

RUN apk add --no-cache --virtual .gyp \
  git \
  python \
  make \
  g++
RUN npm install && npm cache clean --force
COPY . $HOME/src

RUN npm run build

CMD ["npm", "run", "serve"]