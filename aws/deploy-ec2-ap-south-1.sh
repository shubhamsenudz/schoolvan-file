#!/usr/bin/env bash
set -euo pipefail
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-plugin git
sudo mkdir -p /opt/schoolvan-file
cd /opt/schoolvan-file
sudo git pull || sudo git clone https://github.com/shubhamsenudz/schoolvan-file.git .
if [ ! -f .env ]; then echo "Create /opt/schoolvan-file/.env from .env.example"; exit 1; fi
sudo docker compose --env-file .env up -d --build
