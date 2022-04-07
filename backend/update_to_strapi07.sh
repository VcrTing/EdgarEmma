echo '开始更新 插件 smstrapi'
sudo rm -rf /root/edgaremma-crm/plugins/smstrapi
sudo cp ./Edgear/plugins/smstrapi /root/edgaremma-crm/plugins/smstrapi -r
echo '开始更新 SEND WORK'
sudo rm -rf /root/edgaremma-crm/extensions/send_work
sudo cp ./Edgear/extensions/send_work /root/edgaremma-crm/extensions/send_work -r
echo ''
echo '更新完成。'