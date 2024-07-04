FROM node:17.8.0

WORKDIR /app

# Create apps for volumes
RUN mkdir /app/logs

# Copy packages
COPY package.json /app
COPY package-lock.json /app

# Install packages
RUN npm ci

# Copy app
COPY apps /app/apps
COPY libs /app/libs

# Copy configs
COPY tsconfig.json /app
COPY tsconfig.build.json /app
COPY nest-cli.json /app

# Build app
RUN npm run build

# Set envs
ENV PORT 8080
ENV NODE_ENV production

EXPOSE $PORT

CMD npm run start:$SERVICE_NAME