// 首发发送
const fisrt_send = require('./work/first_send')

// 根据 Remind表 生成发送任务
const remind_to_send = require('./work/remind_to_send')

// 根据发送任务表 生成 SMStrapi 队列数据
const send_to_smstrapi = require('./work/send_to_smstrapi')

// 现今时间
const hour = function(src = [ 11, 12, 13, 16, 20, 21 ]) {
    let h = new Date().getHours()
    h = h ? Number.parseInt(h) : 0
    return src.indexOf(h) >= 0
}


module.exports = async function() {
    fisrt_send()
    return 0
    if (hour()) { 
        console.log('工作')
        await remind_to_send()
        await send_to_smstrapi() }
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