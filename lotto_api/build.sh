#!/bin/sh
TAG=$(git describe --abbrev=0 --tags)
PROJECT=lotto-api

docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
docker build -t $DOCKER_USER/$PROJECT:$TAG .
docker build -t $DOCKER_USER/$PROJECT:latest .
docker push $DOCKER_USER/$PROJECT:$TAG
docker push $DOCKER_USER/$PROJECT:latest