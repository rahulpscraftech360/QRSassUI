# Stage 1: Build the application
FROM node:20-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock
COPY package*.json ./
COPY yarn.lock* ./

# Install dependencies
RUN npm install

# Copy rest of the files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application using a basic server
FROM nginx:alpine

# Copy built assets from the builder stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
