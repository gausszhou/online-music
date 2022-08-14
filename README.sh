## jenkins

curl http://192.168.4.198:10010/generic-webhook-trigger/invoke?token=l1qxmXHV609nRSKtGpc2UBhFNfZ5Cwjb


## build

docker build -t netease-music-cloud .
docker save netease-music-cloud:latest | gzip >  netease-music-cloud-cloud-latest.tar.gz
### send file
scp -P 2222 -r "netease-music-cloud-latest.tar.gz" root@8.218.79.208:/docker/projec
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

docker stop netease-cloud
docker rm netease-cloud

docker rmi netease-cloud:latest
docker load < /docker/project/netease-cloud-latest.tar.gz

docker run -d \
--name music.gausszhou.top \
-p 9000:80 \
-v $PWD/nginx.conf:/etc/nginx/nginx.conf \
music.gausszhou.top
