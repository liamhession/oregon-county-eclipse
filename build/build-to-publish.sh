#!/bin/bash

./build-admin.sh
# After admin app is built, it gets added to the eclipse-site static directory.
./build-hugo.sh