const conf = require('../../conf')

const _fetch_items = async function(MODEL, params) {
    let res = await strapi.entityService.find( { params }, { model: MODEL } ) 
    return res && res.length > 0 ? res : null
}

const _insert_note = async function(MODEL, data) {
    data.is_fail = false
    data.send_active = true
    data.send_status = false
    return await strapi.entityService.create( { data }, { model: MODEL } ) 
}

// 查重复，不重复，返回 True
const diff = async function(MODEL, send_day) {
    let res = await _fetch_items(MODEL, { send_day })
    return !(res && res.length > 0)
}

module.exports = {
    note: async function(send_day, phoned, phoned_prefix, content, unique = null) {
        let can = true
        if (unique) {
            can = await diff(conf.ENDPOINT.smsnote, send_day)
        }

        if (can && phoned) {
            const params = { send_day, content, phoned, phoned_prefix }
            return await _insert_note(conf.ENDPOINT.smsnote, params)
        }
    },
    email: async function(send_day, to, subject, content, unique = null) {
        let can = true
        if (unique) {
            can = await diff(conf.ENDPOINT.smsemail, send_day)
        }

        if (can && to) {
            const params = { send_day, to, subject, content }
            return await _insert_note(conf.ENDPOINT.smsemail, params)
        }
    },
    whatsapp: async function(send_day, user, conts) {
        console.log('新增 whatsapp =', send_day, user, conts)
    }
}