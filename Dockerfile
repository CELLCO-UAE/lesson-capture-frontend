
# Stage 1: Build the application
FROM node:20-alpine AS build-stage

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -f 

# Copy the application files
COPY . .

# RUN npx update-browserslist-db@latest
# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine AS production-stage

WORKDIR /app

# Copy the build files from the previous stage
COPY --from=build-stage /app/dist ./dist

# Install serve globally
RUN npm install -g serve

# Expose the port
EXPOSE 3100

# Start the application
CMD ["serve", "-s", "-l", "3100", "dist"]