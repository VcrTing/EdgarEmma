const moment = require('moment')

const get = require('../utils/get')
const upd = require('../utils/upd')
const save = require('../utils/save')
const util = require('../utils/util')
 
const smstrapi = require('../../../plugins/smstrapi/api/index')

const content = require('./inner/fetch_content')

// 4. 插入发送模版。     -- 如果前台没有手动选择模版，则在这里用系统自动插入的发送模版
//    get_def_content 表示使用默认模版。
const _insert_content = function(ways = smstrapi.conf.WAY) {
    let res = { }; ways.map(_w => { res[ _w ] = content.get_def_content(_w) }); return res
}

// 3. 制作 Send
//    每年都要为 Remind 制作一个 Send
//    Send 中的 Times 参数极为关键，制作 smstrapi任务 要用到
//    为 times 添加 内容模版 ID，每个发送时间的内容都可以不一样的，这里使用默认的模版
const _ser_to_sending = async function(rmd, year) {
    let send = { work_year: year, remind: rmd.id, is_serial: false }
        send.times = rmd.rule_ser.map(e => { 
            e.conts = _insert_content(); return e 
        })
        send.user = rmd.company.user
        send.company = rmd.company.id
    return await save.saveSend( send )
}

// 2. 根据 Rule 参数，定制发送时间
const _build_rule = function(rmd, day_sending) {
    return {
        day_sending,
        emails: rmd.company.emails,
        phones: rmd.company.phones,
    }
}

// 1. 序列化，会用到 
//    send_date_real_str 前端需要把这个参数确定好；
//    e.day 是加减 的 天数
const _ser_remind = function(rmd, year) {
    let rs = rmd.rule
    let _src = moment(year + '-' + rmd.send_date_real_str)
    rmd.rule_ser = rs ? rs.map(e => _build_rule(rmd, util.time_num(_src, e.day))) : [ ]
    return rmd
}

module.exports = async function() {
    let _y = new Date().getFullYear()
    // 0. 获取 remind 
    let reminds = await get.getRemind(_y)

    // 序列 remind
    reminds.map(async e => {
        try {
            await _ser_to_sending( _ser_remind( e, _y ), _y )
        } catch(err) { }

        // 5. 修改 今年已经序列化好的 Remind
        await upd.updRemind_Serial(e, _y)
    })
}


/*
    RULE 示例:
    [
        { "day": -30, conts: { 'note': { id: 1 }, 'email': { id: 1 }, 'whatsapp': { id: 1 } } },
        { "day": -7 },
        { "day": 0 }
    ]
*/