#!/bin/bash
echo "Building admin app..."
cd admin-app && npm install && npm run build && rm -rf ../eclipse-site/static/admin && mv build ../eclipse-site/static/admin
