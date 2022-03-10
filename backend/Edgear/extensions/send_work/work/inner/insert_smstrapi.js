const smstrapi = require('../../../../plugins/smstrapi/api/index')

const _build_result = function(res) {
    return {
        'smstrapi': res.id // , 'content': res.content, 'subject': res.subject ? res.subject : null 
    }
}

module.exports = {
    // to 是接收，timed 是哪天发送，cont 是信息对象类型
    note: async function(to, timed, cont) {
        to = to.v ? to.v.split(' ') : null
        // to = 接收者，timed = 发送日期，cont.content = 短信内容
        let res = await smstrapi.insert[ smstrapi.conf.KEY_NOTE ]( timed, to[1], to[0], cont.content )
        if (res && res.id) { res = _build_result(res); res['to'] = to; return res }
    },
    email: async function(to, timed, cont) {
        to = to.v ? to.v : null
        // to = 接收者，timed = 发送日期，cont.content = 电邮HTML，cont.subject = 电邮标题
        let res = await smstrapi.insert[ smstrapi.conf.KEY_EMAIL ](timed, to, cont.subject, cont.content)
        if (res && res.id) { res = _build_result(res); res['to'] = to; return res }
    },
    whatsapp: async function(to, timed, cont) {
        to = to.v ? to.v : null
    }
}