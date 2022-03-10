const conf = require('../../conf')
const insert = require('./insert')

const _fetch_items = async function(MODEL, params) {
    let res = await strapi.entityService.find( { params }, { model: MODEL } ) 
    return res && res.length > 0 ? res : null
}

const _insert_item = async function(MODEL, data) {
    data.is_fail = false
    data.send_active = true
    data.send_status = false
    return await strapi.entityService.create( { data }, { model: MODEL } ) 
}

module.exports = {
    note: async function(send_day, phoned, phoned_prefix, content) {
        let items = await _fetch_items(conf.ENDPOINT.smsnote, { send_day })
        if (items) {
            console.log('重复的 短信 发送 =', items)
        } else {
            return insert[ conf.KEY_NOTE ](send_day, phoned, phoned_prefix, content)
        }
    },
    email: async function(send_day, to, subject, content) {
    },
    whatsapp: async function(send_day, user, conts) {
        console.log('新增 whatsapp =', send_day, user, conts)
    }
}