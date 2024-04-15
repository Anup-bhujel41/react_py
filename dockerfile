# Stage 1: Build React app
FROM node:16 as react-builder

WORKDIR /app

COPY ./client/package.json ./client/yarn.lock ./

RUN yarn install

COPY ./client ./

RUN yarn build

# Stage 2: Build Python app
FROM python:3.8-slim

WORKDIR /app

# Copy the Python requirements file into the container at /app
COPY ./api/requirements.txt ./

# Install any needed dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the built React app from the previous stage
COPY --from=react-builder /app/build /app/client/build

# Copy the rest of the application code into the container at /app
COPY . ./

# Expose the port the app runs on
EXPOSE 8000

# Run the Python application
CMD ["python", "app.py"]
