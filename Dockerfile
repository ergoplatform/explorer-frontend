# build environment
FROM node:10.0.0 as builder
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# production environment
FROM nginx:1.14.0
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d
COPY config/nginx /etc/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
