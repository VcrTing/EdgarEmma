const util = require('../utils/util')
const get = require('../utils/get')

const smstrapi = require('../../../plugins/smstrapi/api/index')

// 1.5 计算是否超出今天
const outdate = require('./inner/_outdate')

// 6. 修改 SEND
const upd = require('../utils/upd')

// 5. 建立 SMSTRAPI
const insert = require('./inner/insert_smstrapi')

// 3. 获取任务内容
const content = require('./inner/fetch_content')
// 4. 构建内容所需要的参数 
const _build_params = function(snd) {
    return snd
}

// 2. 判断能不能执行发送，传入 时间参数
const _judge_send = function(tmd) {
    let can = { }
    can[ smstrapi.conf.KEY_NOTE ] = tmd.phones && tmd.phones.length > 0 ? tmd.phones : [ ]
    can[ smstrapi.conf.KEY_EMAIL ] = tmd.emails && tmd.emails.length > 0 ? tmd.emails : [ ]
    can[ smstrapi.conf.KEY_WHATSAPP ] = tmd.whatsapp && tmd.whatsapp.length > 0 ? tmd.whatsapp : [ ]
    for (let k in can) { if ( !can[ k ] ) { delete can[ k ] } }; return can
}

// 1. 判断发送是否现在，是的话就建立发送任务
const _doing = async function(_tis, snd, ways) {
    // 判断是否 超出当前时间
    _tis[ 'send_day_real' ] = outdate.outdate( _tis.day_sending )
    // 判断 能不能，返回结果是 电话s / 电邮s
    let can = _judge_send(_tis)
    // 循环发送 类型
    for (let k in can) {
        // 获取 任务内容，先获取内容对象，再建立清洗参数，再拿去清洗，得出最终要发送的内容对象
        let cont = content.wash_content( content.content(k, _tis.conts), _build_params(snd))
        // 取出每个 联络电话 / 电邮
        can[ k ] = can[ k ].map(async v => {
            if ((ways.indexOf(k) >= 0) && cont.content) {
                    // 插入新 任务队列 结果
                    v.is_serial = true
                    v.result = await insert[ k ]( v, _tis[ 'send_day_real' ], cont)
            }  else {
                    // 用户没有选择 该发送方式 的 时候
                    v.is_serial = false }; return v
        })
    }; return _tis
}
const _ser_send = async function(snd, ways) {
    snd.times.map(async e => { e = await _doing(e, snd, ways); return e })
    snd.times_since.map(async e => { e = await _doing(e, snd, ways); return e })
    return snd
}

module.exports = async function() {
    // 规定时间
    const year = new Date().getFullYear()
    // 搜索 Send
    let sends = await get.getSend(year)
    // 操作 Send
    sends.map(async e => { 

        // 解析 Way
        let way = e.remind.send_way_world
        way = way ? way.split('_') : [ ]
        
        try { // 序列化 Send，生成发送
            e = await _ser_send( e, way ) } catch( err ) { }

        // 修改 结果
        await upd.updSend_Result(e)
    })
}

/*

序列化好之后的 Times

[
  {
    "day_sending": "2022-01-02",
    "emails": [
      {
        "v": "vcrting@163.com",
        "is_serial": true,
        "result": {
          "smstrapi": 18,
          "send_day": "2023-01-02",
          "to": "vcrting@163.com"
        }
      }
    ],
    "phones": [
      {
        "v": "92779625",
        "is_serial": false
      }
    ],
    "conts": {
      "note": {
        "id": 1
      },
      "email": {
        "id": 1
      },
      "whatsapp": {
        "id": 1
      }
    }
  }
]

*/