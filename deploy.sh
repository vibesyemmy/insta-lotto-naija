#!/bin/bash

# Build main API
cd lotto_api && docker build -t $DOCKER_USER/lotto-main-api:$TAG -t $DOCKER_USER/lotto-main-api:latest . && cd ..
# Build main Live API
cd lotto-live-server && docker build -t $DOCKER_USER/lotto-live-api:$TAG -t $DOCKER_USER/lotto-live-api:latest . && cd ..
# Build main User front end
cd lotto-front-main && docker build -t $DOCKER_USER/lotto-user-ui:$TAG -t $DOCKER_USER/lotto-user-ui:latest  . -f Dockerfile.user.front && cd ..

# Push images to docker hub

docker push $DOCKER_USER/lotto-main-api:$TAG
docker push $DOCKER_USER/lotto-main-api:latest

docker push $DOCKER_USER/lotto-live-api:$TAG
docker push $DOCKER_USER/lotto-live-api:latest

docker push $DOCKER_USER/lotto-user-ui:$TAG
docker push $DOCKER_USER/lotto-user-ui:latest

kubectl apply -f k8s
kubectl set image deployments/lotto-main-deployment main-server=$DOCKER_USER/lotto-main-api:$TAG
kubectl set image deployments/lotto-live-api-deployment live-query-server=$DOCKER_USER/lotto-live-api:$TAG
kubectl set image deployments/user-ui-deployment client=$DOCKER_USER/lotto-user-ui:$TAG