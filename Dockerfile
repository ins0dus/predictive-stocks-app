FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Install production dependencies
RUN npm install --production

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port for the web application
EXPOSE 3000

# Create a script to start both processes
RUN echo '#!/bin/sh\nnpm run start &\nnpm run bot' > /app/start.sh && chmod +x /app/start.sh

# Start both the web server and Discord bot
CMD ["/app/start.sh"] 