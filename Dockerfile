FROM mhart/alpine-node:12 as builder

WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN yarn global add typescript@3.8
RUN yarn
COPY . ./
ENV NODE_ENV production
RUN yarn build

FROM nginx:stable
COPY --from=builder /usr/src/app/build /usr/share/nginx/html/
COPY --from=builder /usr/src/app/api.yaml /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# See https://docs.docker.com/engine/reference/builder/#healthcheck
HEALTHCHECK --interval=2m --timeout=10s --start-period=1m --retries=3 \
    CMD curl --max-time 5 http://127.0.0.1:80/ || exit 1
