FROM registry.docker-cn.com/library/node:12.22.1

WORKDIR /app
COPY package.json /app/
RUN npm install

COPY . /app
RUN npm run build

FROM registry.docker-cn.com/library/nginx
COPY --from=0 /app/dist /app
COPY --from=0 /app/nginx.conf /etc/nginx/nginx.conf