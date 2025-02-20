FROM node:18-alpine

WORKDIR /app

# Install bash (required for some pnpm scripts)
RUN apk add --no-cache bash

# Set the SHELL environment variable to bash
ENV SHELL=/bin/bash

# Install pnpm and configure it
RUN npm install -g pnpm && \
    pnpm setup

# Set PNPM_HOME and add it to PATH
ENV PNPM_HOME=/opt/pnpm
ENV PATH=$PNPM_HOME:$PATH

# Copy package.json and pnpm-lock.yaml
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application (if needed)
RUN pnpm build


