
# Use an official Node.js runtime as base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install --production

COPY . .

EXPOSE 3000

# Start the application
CMD ["node", "server.js"]

