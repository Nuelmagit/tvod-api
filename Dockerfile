FROM node:12-alpine as buildContainer
WORKDIR /app
COPY . /app
RUN npm install --production

FROM node:10.16-alpine

WORKDIR /app

# Get all the code needed to run the app
COPY --from=buildContainer /app /app

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["node", "index.js"]
