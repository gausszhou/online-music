docker run -d \
--name netease-cloud-music-vue \
-p 9000:80 \
-v $PWD/nginx.conf:/etc/nginx/nginx.conf \
netease-cloud-music-vue