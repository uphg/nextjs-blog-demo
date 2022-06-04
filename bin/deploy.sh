echo 'start';
docker start psql1 && # 启动服务器
cd /home/blog/app/ &&
git pull origin main &&
yarn install --production=false &&
yarn build &&
yarn compile &&
yarn m:run &&
docker build -t jack/node-web-app . &&
docker kill app &&
docker rm app &&
docker run --name app --network=host -p 3000:3000 -d jack/node-web-app &&
echo 'OK!'
