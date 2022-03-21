const conts = require('../../save/msg')
const outdate = require('./_outdate')

const WASH_KEY = [ 'subject', 'content' ]
/*
    DATA 参数要准备三个字段，user、company、remind
*/
const WASH_DEALING = {
    'user_email': (txt, data) => txt.replace('{{user_email}}', data.user.email),
    'company_named': (txt, data) => txt.replace('{{company_named}}', data.company.names[0].txt),
    'filling_timed': (txt, data) => txt.replace('{{filling_timed}}', outdate.outdate( new Date().getFullYear() + '-' + data.remind.send_date_real_str) ),
}

// 清洗内容
const _wash = function(txt, data) {
    for (let k in WASH_DEALING) {
        txt = WASH_DEALING[ k ]( txt, data )
    }; return txt
}
// 循环字段，每一个字段所属的内容，都进行清洗
const wash_content = function(conts, data) {
    WASH_KEY.map(e => {
        conts[ e ] = _wash( conts[ e ], data )
    }); return conts
}

module.exports = {

    // 插入系统自带的 提醒模版
    get_def_content: function(way) {
        let c = conts[ way ].filter(e => e.id == 1)
        c = c && c.length > 0 ? c[0] : conts[ 'error' ]
        return { id: c.id }
    },
    
    // 获取内容
    
    content: function(way, ids) {
        ids = ids[ way ]
        let src = conts[ way ]
        src = src.filter(e => e.id == ids.id)
        src = src && src.length > 0 ? src[0] : null

        return src 
    },

    // 清洗内容
    wash_content
}