#!/bin/bash

set -e

echo "mrsmith9ja"

# Build main API
cd lotto_api && docker build -t mrsmith9ja/lotto-main-api:$TAG -t mrsmith9ja/lotto-main-api:latest . && cd ..
# Build main Live API
cd lotto-live-server && docker build -t mrsmith9ja/lotto-live-api:$TAG -t mrsmith9ja/lotto-live-api:latest . && cd ..
# Build main User front end
cd lotto-front-main && docker build -t mrsmith9ja/lotto-user-ui:$TAG -t mrsmith9ja/lotto-user-ui:latest  . -f Dockerfile.user.front && cd ..
# Build landing page
cd lotto-landing && docker build -t mrsmith9ja/lotto-landing:$TAG -t mrsmith9ja/lotto-landing:latest . && cd ..

# Push images to docker hub

docker push mrsmith9ja/lotto-main-api:$TAG
docker push mrsmith9ja/lotto-main-api:latest

docker push mrsmith9ja/lotto-live-api:$TAG
docker push mrsmith9ja/lotto-live-api:latest

docker push mrsmith9ja/lotto-user-ui:$TAG
docker push mrsmith9ja/lotto-user-ui:latest

docker push mrsmith9ja/lotto-landing:$TAG
docker push mrsmith9ja/lotto-landing:latest

kubectl apply -f k8s
kubectl set image deployments/lotto-main-deployment main-server=mrsmith9ja/lotto-main-api:$TAG
kubectl set image deployments/lotto-live-api-deployment live-query-server=mrsmith9ja/lotto-live-api:$TAG
kubectl set image deployments/user-ui-deployment client=mrsmith9ja/lotto-user-ui:$TAG