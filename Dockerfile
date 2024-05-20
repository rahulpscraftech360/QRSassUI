# # Stage 1: Build the application
# FROM node:20-alpine as build

# WORKDIR /app

# # Copy package.json and package-lock.json/yarn.lock
# COPY package*.json ./


# # Install dependencies
# RUN npm install

# # Copy rest of the files
# COPY . .

# # Build the application
# RUN npm run build

# # Stage 2: Serve the application using a basic server
# FROM nginx:alpine

# # Copy built assets from the builder stage
# COPY --from=build /app/dist /usr/share/nginx/html

# # Expose port 5173 to the outside once the container has launched
# EXPOSE 5173

# # Run nginx
# CMD ["nginx", "-g", "daemon off;"]
# Stage 1: Build the application
FROM node:20-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock
COPY package*.json ./

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

# Customize Nginx to listen on port 5173
RUN echo "server { listen 5173; location / { root /usr/share/nginx/html; index index.html index.htm; try_files \$uri \$uri/ /index.html =404; }}" > /etc/nginx/conf.d/default.conf

# Expose port 5173 to the outside once the container has launched
EXPOSE 5173

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
