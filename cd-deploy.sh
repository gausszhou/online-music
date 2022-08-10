npm install 
npm run build 

docker build -t netease-cloud-music-vue .

docker run -d \
--name netease-cloud-music-vue \
-p 9001:80 \
netease-cloud-music-vue

