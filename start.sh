#!/bin/bash

# Fetch the IP address of en0 interface using ipconfig
IP=$(ipconfig getifaddr en0)

# Check if IP is retrieved. If not, exit the script.
if [ -z "$IP" ]; then
    echo "IP address not found. Exiting."
    exit 1
fi

echo "Starting Hugo server at http://$IP"

# Start Hugo server with the fetched IP
hugo server --bind $IP --baseURL http://$IP

