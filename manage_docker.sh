#!/bin/bash

# Define the compose file path
COMPOSE_FILE="docker-compose.yml"

# Function to start the Docker Compose services
start_services() {
  echo "Starting Docker Compose services..."
  docker compose -f $COMPOSE_FILE up -d
  echo "Services are up and running."
}

# Function to stop the Docker Compose services
stop_services() {
  echo "Stopping Docker Compose services..."
  docker compose -f $COMPOSE_FILE down
  echo "Services have been stopped."
}

# Check command-line argument
case "$1" in
  start)
    start_services
    ;;
  stop)
    stop_services
    ;;
  *)
    echo "Usage: $0 {start|stop}"
    exit 1
    ;;
esac
