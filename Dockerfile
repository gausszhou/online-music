# FROM node:12.22.1 as build
# WORKDIR /app

# COPY package.json /app/
# COPY package-lock.json /app/
# RUN  npm i nrm -g && nrm use taobao && npm i
# RUN  npm run build

# FROM nginx:1.22.0-alpine
# WORKDIR /app
# COPY --from=build /app/dist /app
# COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf


FROM nginx:1.22.0-alpine
WORKDIR /app
COPY ./dist /app
COPY ./nginx.conf /etc/nginx/nginx.conf
