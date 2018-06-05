# production environment
FROM nginx:1.14.0
RUN rm -rf /etc/nginx/conf.d
COPY config/docker/nginx/conf.d /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
