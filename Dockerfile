FROM nginx:1.22.0-alpine
WORKDIR /app
COPY ./dist /app
COPY ./nginx.conf /etc/nginx/nginx.conf
