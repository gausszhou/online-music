## jenkins

curl http://192.168.4.198:10010/generic-webhook-trigger/invoke?token=l1qxmXHV609nRSKtGpc2UBhFNfZ5Cwjb

## build
npm install
npm run build
docker build -t netease-music-cloud .
docker save netease-music-cloud:latest | gzip >  netease-music-cloud-latest.tar.gz
### send file
scp -P 2222 -r "netease-music-cloud-latest.tar.gz" root@8.218.79.208:/docker/project
### webhook
curl http://8.218.79.208:10086/webhook?token=l1qxmXHV609nRSKtGpc2UBhFNfZ5Cwjb

## webhook

{
  "token": "l1qxmXHV609nRSKtGpc2UBhFNfZ5Cwjb",
  "name": "restart-netease",  
  "steps": [
    {
      "name": "restart",
      "command": "bash /script/restart-netease.sh"
    }
  ]
}

## deploy

docker stop music.gausszhou.top
docker rm music.gausszhou.top

docker rmi netease-music-cloud:latest
docker load < /docker/project/netease-music-cloud-latest.tar.gz

docker run -d \
--restart=always \
--name music.gausszhou.top \
-p 8002:80 \
netease-music-cloud:latest
