# build environment
FROM node:alpine as builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./

RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
      chromium@edge \
      nss@edge

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROME_BIN=/usr/bin/chromium-browser

RUN yarn
COPY . ./
ENV NODE_ENV production
RUN yarn run prod:client
RUN yarn run prod:server
RUN rm -rf ./node_modules
RUN yarn --production


# production environment
FROM node:9-alpine
WORKDIR /usr/src/app

RUN apk update && apk upgrade && \
    echo @3.8 http://nl.alpinelinux.org/alpine/v3.8/community >> /etc/apk/repositories && \
    echo @3.8 http://nl.alpinelinux.org/alpine/v3.8/main >> /etc/apk/repositories && \
    apk add --no-cache \
      chromium@3.8 \
      nss@3.8

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROME_BIN=/usr/bin/chromium-browser


ENV NODE_ENV production
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/api.yaml ./api.yaml
EXPOSE 5000
CMD node build/server/bundle.js
