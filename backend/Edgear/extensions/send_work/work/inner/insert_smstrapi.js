const smstrapi = require('../../../../plugins/smstrapi/api/index')

const _build_result = function(res) {
    return {
        'smstrapi': res.id, 
        // , 'content': res.content, 'subject': res.subject ? res.subject : null 
        'send_day': res.send_day
    }
}

module.exports = {
    // to 是接收，timed 是哪天发送，cont 是信息对象类型
    note: async function(to, timed, cont, mark) {
        to = to.v ? to.v.split(' ') : [ ]
        to = to.length > 1 ? to : [ '852', to[0] ]
        // to = 接收者，timed = 发送日期，cont.content = 短信内容
        let res = await smstrapi.insert[ 
            smstrapi.conf.KEY_NOTE ]( timed, to[1], to[0], cont.content, mark, true )
        if (res && res.id) { res = _build_result(res); res['to'] = to; return res }
    },
    email: async function(to, timed, cont, mark) {
        to = to.v ? to.v : null
        // to = 接收者，timed = 发送日期，cont.content = 电邮HTML，cont.subject = 电邮标题
        let res = await smstrapi.insert[ 
            smstrapi.conf.KEY_EMAIL ](timed, to, cont.subject, cont.content, mark, true )
        if (res && res.id) { res = _build_result(res); res['to'] = to; return res }
    },
    whatsapp: async function(to, timed, cont, mark) {
        to = to.v ? to.v : null
        // to = 接收者，timed = 发送日期，cont.content = 公司名称，cont.tempiate_name = 后台需要使用的模版名称
        let res = await smstrapi.insert[ 
            smstrapi.conf.KEY_WHATSAPP ](timed, to, cont.tempiate_name, cont.content, mark, true )
        if (res && res.id) { res = _build_result(res); res['to'] = to; 
            return res }
    }
}