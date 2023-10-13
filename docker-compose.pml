version: '3'
services:
  client:
    build: 
      context: ./client
      dockerfile: Dockerfile.react
    ports:
      - "8001:3000"   #8001 of the host to 3000 if the container

  api:
    build: 
      context: ./api
      dockerfile: Dockerfile.python
    ports:
      - "8000:8000"