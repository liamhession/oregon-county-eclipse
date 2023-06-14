#!/bin/bash
echo "Building admin app..."
cd ../admin-app && npm install && npm run build && mv build ../eclipse-site/static/admin
