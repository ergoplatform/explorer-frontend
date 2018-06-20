# build environment
FROM node:alpine as builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
ENV NODE_ENV production
RUN yarn run prod:client
RUN yarn run prod:server
RUN rm -rf ./node_modules
RUN yarn --production


# production environment
FROM node:alpine
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/api.yaml ./api.yaml
EXPOSE 5000
CMD node build/server/bundle.js
