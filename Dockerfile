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

# Start both the web server and Discord bot
CMD ["sh", "-c", "npm run start & npm run bot"] 