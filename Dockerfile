# build environment
FROM node:10.15.3-alpine as builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./

RUN apk update && apk upgrade && \
    echo @3.9 http://nl.alpinelinux.org/alpine/v3.9/community >> /etc/apk/repositories && \
    echo @3.9 http://nl.alpinelinux.org/alpine/v3.9/main >> /etc/apk/repositories && \
    apk add --no-cache \
      freetype@3.9 \
      harfbuzz@3.9 \
      chromium@3.9 \
      nss@3.9

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROME_BIN=/usr/bin/chromium-browser

RUN npm install -g typescript
RUN yarn
COPY . ./
ENV NODE_ENV production
RUN yarn run prod:client
RUN yarn run prod:server
RUN rm -rf ./node_modules
RUN yarn --production


# production environment
FROM node:10.15.3-alpine
WORKDIR /usr/src/app

RUN apk update && apk upgrade && \
    echo @3.9 http://nl.alpinelinux.org/alpine/v3.9/community >> /etc/apk/repositories && \
    echo @3.9 http://nl.alpinelinux.org/alpine/v3.9/main >> /etc/apk/repositories && \
    apk add --no-cache \
      freetype@3.9 \
      harfbuzz@3.9 \
      chromium@3.9 \
      nss@3.9

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROME_BIN=/usr/bin/chromium-browser


ENV NODE_ENV production
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/api.yaml ./api.yaml
EXPOSE 5000
CMD node build/server/bundle.js
