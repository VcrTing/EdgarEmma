const twilio = require('../api/twilio')

const db_note = require('../data/note')

// 短信
const _note = async function(e, fac, sender) {
    if (e && !e.send_status && e.send_active) {
        let _send = await twilio.send(fac, e.content, e.phoned_prefix + ' ' + e.phoned, sender)
        _send = twilio.ser_result(_send)
        db_note.update({ id: e.id, ..._send })
    }
}
const note = async function(key) {
    if (key) {
        const fac = twilio.factory(key.sid, key.token)
        let res = await db_note.query()
        if (res) { res.map(async e => _note(e, fac, key.sender)) }
    }
}

const email = async function(key) {
    
}
const whatsapp = async function(sid, token, sender) {
    
}

module.exports = {
    note,
    email,
    whatsapp
}