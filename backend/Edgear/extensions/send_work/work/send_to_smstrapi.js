const util = require('../utils/util')
const get = require('../utils/get')

const smstrapi = require('../../../plugins/smstrapi/api/index')

// 5. 修改 SEND
const upd = require('../utils/upd')

// 4. 建立 SMSTRAPI
const insert = require('./inner/insert_smstrapi')

// 3. 获取任务内容
const content = require('./inner/fetch_content')

// 2. 判断能不能执行发送，传入 时间参数
const _judge_send = function(tmd) {
    let can = { }
    can[ smstrapi.conf.KEY_NOTE ] = tmd.phones && tmd.phones.length > 0 ? tmd.phones : [ ]
    can[ smstrapi.conf.KEY_EMAIL ] = tmd.emails && tmd.emails.length > 0 ? tmd.emails : [ ]
    can[ smstrapi.conf.KEY_WHATSAPP ] = tmd.whatsapp && tmd.whatsapp.length > 0 ? tmd.whatsapp : [ ]
    for (let k in can) { if ( !can[ k ] ) { delete can[ k ] } }; return can
}

// 1. 判断发送是否现在，是的话就建立发送任务
const _ser_send = async function(snd, ways) {
    snd.times = snd.times.map(e => {
        const timed = e.day_sending
        // 判断 能不能，返回结果是 电话s / 电邮s
        let can = _judge_send(e)

        // 循环发送 类型
        for (let k in can) {

                // 获取 任务内容
                let cont = content.content(k, e.conts)
                // 取出每个 联络电话 / 电邮
                can[ k ] = can[ k ].map(async v => {

                        if ((ways.indexOf(k) >= 0) && cont.content) {
                                // 插入新 任务队列 结果
                                v.is_serial = true
                                v.result = await insert[ k ]( v, timed, cont)
                        }  else {
                                // 用户没有选择 该发送方式 的 时候
                                v.is_serial = false
                        }
                        return v
                })
        }; return e
    })
    return snd
}

module.exports = async function() {
    // 搜索 Send
    let sends = await get.getSend()

    // 操作 Send
    sends.map(async e => { 

        // 解析 Way
        let way = e.remind.send_way_world
        way = way ? way.split('_') : [ ]
        
        // 序列化 Send，生成发送
        e = await _ser_send( e, way ) 

        // 修改 结果
        await upd.updSend_Result(e)
    })
}

/*

    "emails": [
      {
        "v": "vcrting@163.com",
        "is_serial": true,
        "result": {
          "smstrapi": 5,
          "to": "vcrting@163.com"
        }
      }
    ],
*/