const conts = require('../../save/msg')

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
        return src && src.length > 0 ? src[0] : null
    }
}