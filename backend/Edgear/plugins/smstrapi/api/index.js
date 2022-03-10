const conf = require('../conf')

const insert = require('./db/insert')
const insert_unique = require('./db/insert_unique')

module.exports = {
    conf,

    // 判断是否有相同的 WAY 字段
    has_way: function(typed) { return conf.WAY.filter(e => typed == e).length > 0 },

    // typed 传入 note / email / whatsapp
    // user 数据固定，格式为：{ to_prefix: '852/null', to: '92779625/xxx@email.com', from: 'null/xxx@email.com' }
    // conts 数据固定，格式为：{ subject: 'null/这是一封邮件', content: '短信内容/邮件HTML内容' }
    insert,
    insert_unique
}