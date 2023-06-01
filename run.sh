#!/bin/sh
# This command is designed to work on Mac OS and is designed for demonstration
# purposes only. On other operating systems, you will need to adjust this code.
docker run -p 5432:5432 \
  -p 3000:3000 \
  -e DATABASE_URL=postgresql://host.docker.internal:5432/documentstudies_production \
  -e VITE_PUBLIC_ADOBE_CLIENT_ID=955e8a7fbf49409f88e781533a48685d \
  -e SECRET_KEY_BASE=supersecret \
  -t app
