
// 根据 Remind表 生成发送任务
const remind_to_send = require('./work/remind_to_send')

// 根据发送任务表 生成 SMStrapi 队列数据
const send_to_smstrapi = require('./work/send_to_smstrapi')


module.exports = function() {
    remind_to_send()
    send_to_smstrapi()
}

/*
    SEND 的 times 队列 数据结构 例子:
[
    {
        "day_sending": "2022-08-13",
        "emails": [
            {
                "v": "vcrting@163.com"
            }
        ],
        "phones": [
            {
                "v": "+852 92779625"
            }
        ],
        "conts": {
            "note": {
                "id": 1,
                "subject": ""
            },
            "email": {
                "id": 1,
                "subject": "这里是电邮的标题"
            },
            "whatsapp": {
                "id": 1,
                "subject": ""
            }
        }
    },
]
*/