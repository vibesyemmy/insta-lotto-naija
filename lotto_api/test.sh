#!/bin/sh
echo "Creating profile"
touch ~/.bashrc

echo "Downloading NVM"
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | sh

echo "Loading NVM"
source ~/.bashrc
echo $(nvm -v)

ls ./

echo "Install Node 10.13.0"
nvm install --lts

npm install

npm run test