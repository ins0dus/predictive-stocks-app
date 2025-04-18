# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY craco.config.js ./

# Install dependencies with legacy peer deps to avoid React conflicts
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the React application
RUN npm run build

# Install serve to run the production build
RUN npm install -g serve

# Use $PORT environment variable from Railway
ENV PORT=3000

# Start the application using serve with Railway's PORT
CMD serve -s build -l ${PORT} 