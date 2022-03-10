const conf = require('../../conf')

const _insert_note = async function(MODEL, data) {
    data.is_fail = false
    data.send_active = true
    data.send_status = false
    return await strapi.entityService.create( { data }, { model: MODEL } ) 
}

module.exports = {
    note: async function(send_day, phoned, phoned_prefix, content) {
        if (phoned && content) {
            const params = {
                send_day,
                content,
                phoned,
                phoned_prefix
            }
            return await _insert_note(conf.ENDPOINT.smsnote, params)
        }
    },
    email: async function(send_day, to, subject, content) {
        if (to && content) {
            const params = {
                send_day,
                to,
                subject,
                content,
            }
            return await _insert_note(conf.ENDPOINT.smsemail, params)
        }
    },
    whatsapp: async function(send_day, user, conts) {
        console.log('新增 whatsapp =', send_day, user, conts)
    }
}