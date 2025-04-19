FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Install production dependencies and concurrently
RUN npm install --production
RUN npm install -g concurrently ts-node

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port for the web application
EXPOSE 3000

# Start both the web server and Discord bot
CMD ["npm", "run", "start"] 