const conf = require('../conf')

const insert = require('./db/insert')

const instant = require('./instant/instant')

module.exports = {
    conf,
    // typed 传入 note / email / whatsapp
    // user 数据固定，格式为：{ to_prefix: '852/null', to: '92779625/xxx@email.com', from: 'null/xxx@email.com' }
    // conts 数据固定，格式为：{ subject: 'null/这是一封邮件', content: '短信内容/邮件HTML内容' }
    insert,

    instant
}