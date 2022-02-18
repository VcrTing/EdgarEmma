echo '开始安装'
echo ''
echo '安装 NODE'
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
echo ''
echo 'NODE 安装成功'
echo ''
echo '安装 STRAPI, 执行完成后，请关闭Strapi默认启动'
npx create-strapi-app ../../backend/Emma