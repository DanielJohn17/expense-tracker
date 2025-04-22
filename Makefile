# Makefile for Expense Tracker

# Variables
FRONTEND_DIR=frontend
SERVER_DIR=server

# Targets
.PHONY: all build-frontend start-server

all: build-frontend start-server

build-frontend:
	cd $(FRONTEND_DIR) && bun install && bun run build

start-server: build-frontend
	cd $(SERVER_DIR) && bun install && bun start