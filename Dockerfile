# build environment
FROM node:10.16.0-alpine as builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./

RUN apk update && apk upgrade && \
    echo @latest-stable http://nl.alpinelinux.org/alpine/latest-stable/community >> /etc/apk/repositories && \
    echo @latest-stable http://nl.alpinelinux.org/alpine/latest-stable/main >> /etc/apk/repositories && \
    apk add --no-cache \
      freetype@latest-stable \
      harfbuzz@latest-stable \
      chromium@latest-stable \
      nss@latest-stable

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROME_BIN=/usr/bin/chromium-browser

RUN yarn global add typescript@3.4.5
RUN yarn
COPY . ./
ENV NODE_ENV production
RUN yarn run prod:client
RUN yarn run prod:server
RUN rm -rf ./node_modules
RUN yarn --production


# production environment
FROM node:10.16.0-alpine
WORKDIR /usr/src/app

RUN apk update && apk upgrade && \
    echo @latest-stable http://nl.alpinelinux.org/alpine/latest-stable/community >> /etc/apk/repositories && \
    echo @latest-stable http://nl.alpinelinux.org/alpine/latest-stable/main >> /etc/apk/repositories && \
    apk add --no-cache \
      curl \
      freetype@latest-stable \
      harfbuzz@latest-stable \
      chromium@latest-stable \
      nss@latest-stable

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROME_BIN=/usr/bin/chromium-browser


ENV NODE_ENV production
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/api.yaml ./api.yaml
EXPOSE 5000
CMD node build/server/bundle.js
# See https://docs.docker.com/engine/reference/builder/#healthcheck
HEALTHCHECK --interval=2m --timeout=10s --start-period=1m --retries=3 \
    CMD curl --max-time 5 http://127.0.0.1:5000/ || exit 1
