FROM node:18-alpine
# Install Python and essential build tools
RUN apk update && \
    apk add --no-cache python3 make g++ && \
    rm -rf /var/cache/apk/*

# Create a symlink for python if not already set (optional)
RUN if [ ! -e /usr/bin/python ]; then ln -sf python3 /usr/bin/python ; fi

# Set environment variable for Python3 (may not be needed if symlink is set)
ENV PYTHON="/usr/bin/python3"

# Create the directory on the node image 
# where our Next.js app will live
RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Copy package.json and yarn.lock
# to the /app working directory
COPY package*.json yarn.lock ./

# Install dependencies in /app
RUN yarn install --network-timeout 1000000

# Copy the rest of our Next.js folder into /app
COPY . .

# Build the Next.js application
RUN yarn build

# Ensure port 3000 is accessible to our system
EXPOSE 3000

# Run yarn start, as we would via the command line 
CMD ["yarn", "start"]
