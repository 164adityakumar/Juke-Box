# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the image
COPY package*.json ./

# Install dependencies in the Docker image
RUN npm install

# Copy the rest of the source code into the image
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run the app
CMD tsc -b && nodemon dist/index.js