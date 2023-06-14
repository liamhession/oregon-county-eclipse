#!/bin/bash

git diff --quiet HEAD HEAD~1 ./admin-app/
if [ $? -eq 1 ]
then
  echo "Changes detected in admin-app directory."
  ./build/build-admin.sh
fi

git diff --quiet HEAD HEAD~1 ./eclipse-site/
if [ $? -eq 1 ]
then
  echo "Changes detected in eclipse-site directory."
  ./build/build-hugo.sh
fi
