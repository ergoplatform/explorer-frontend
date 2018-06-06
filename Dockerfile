FROM node:10.0.0
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn run prod:client
RUN yarn run prod:server
EXPOSE 5000
CMD node build/server/bundle.js
