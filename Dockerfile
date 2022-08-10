FROM nginx
WORKDIR /app
COPY ./dist/* /app
COPY ./nginx.conf /etc/nginx/nginx.conf