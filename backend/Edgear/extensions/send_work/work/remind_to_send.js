
const get = require('../utils/get')
const upd = require('../utils/upd')
const save = require('../utils/save')
const util = require('../utils/util')
 
const smstrapi = require('../../../plugins/smstrapi/api/index')

const content = require('./inner/fetch_content')

// 5. 修改 今年已经序列化好的 Remind
const _upd_remind = async function(rmd, y) {
    let src = rmd.work_year
    src = src ? src + '_' : ''
    await upd.updRemind(rmd.id, { work_year: src + y })
}

// 4. 插入发送模版。     -- 如果前台没有手动选择模版，则在这里用系统自动插入的发送模版
const _insert_content = function(ways = smstrapi.conf.WAY) {
    let res = { }
    ways.map(_w => { res[ _w ] = content.get_def_content(_w) })
    return res
}

// 3. 制作 Send
const _ser_to_sending = async function(rmd, year) {
    let send = { work_year: year, remind: rmd.id, is_serial: false }
        send.times = rmd.rule_ser.map(e => { 
            e.conts = _insert_content(); return e 
        })
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

// 1. 序列化 
const _ser_remind = function(rmd, year) {
    let rs = rmd.rule
    let _src = year + '-' + rmd.send_date_real_str // rmd.unsure ? rmd.sending_time_really : rmd.real_filling_date
    rmd.rule_ser = rs ? rs.map(e => _build_rule(rmd, util.time_num(_src, e.day))) : [ ]
    return rmd
}

module.exports = async function() {
    let _y = new Date().getFullYear()
    // 获取 remind 
    let reminds = await get.getRemind(_y)

    // 序列 remind
    reminds.map(async e => {
        let snd = await _ser_to_sending( _ser_remind( e, _y ), _y )

        if (snd && snd.id) {
            // 保存 今年成功的 Remind
            await _upd_remind(e, _y)
        }
    })
}


/*
    RULE 示例:
    [
        { "day": -30 },
        { "day": -7 },
        { "day": 0 }
    ]
*/