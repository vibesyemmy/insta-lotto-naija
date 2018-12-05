FROM node:10.13.0-alpine

EXPOSE 3030

RUN adduser -S app

ENV HOME=/home/app

COPY package.json $HOME/src/
RUN chown -R app $HOME/*

WORKDIR $HOME/src

USER root

RUN npm install && npm cache clean --force
COPY . $HOME/src

CMD ["npm", "start"]