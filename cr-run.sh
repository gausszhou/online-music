docker run -d \
--name netease-cloud-music-vue \
-p 9001:80 \
-v $pwd/nginx.conf:/etc/nginx/nginx.conf \
netease-cloud-music-vue