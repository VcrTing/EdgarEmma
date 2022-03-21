echo '开始更新 插件 smstrapi'
sudo rm -rf /root/edgaremma-crm/plugins/smstrapi
sudo cp /root/edgaremma-crm/plugins/smstrapi ./Edgear/plugins/smstrapi
echo '开始更新 SEND WORK'
sudo rm -rf /root/edgaremma-crm/extensions/send_work
sudo cp /root/edgaremma-crm/extensions/send_work ./Edgear/extensions/send_work
echo ''
echo '更新完成。'