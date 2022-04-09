const conf = require('../../conf')
const tw_email = require('../api/email')
const twilio = require('../api/twilio')

const db_note = require('../data/note')
const db_email = require('../data/email')

// 短信
const _note = async function(e, fac, sender) {
    if (e && !e.send_status && e.send_active) {
        let _send = null 
        // try {
            _send = await twilio.send(fac, e.content, e.phoned_prefix + ' ' + e.phoned, sender)
        // } catch (err) { }
        _send = twilio.ser_result(_send)
        db_note.update({ id: e.id, ..._send }, conf.ENDPOINT.smsnote)
    }
}
const note = async function(key) {
    if (key && key.sid) {
        const fac = twilio.factory(key.sid, key.token)
        let res = await db_note.query( conf.ENDPOINT.smsnote )
        if (res) { res.map(async e => _note(e, fac, key.sender)) }
    }
}

// 电邮
const _email = async function(e, sender) {
    if (e && !e.send_status && e.send_active) {
        try { await tw_email.send(e.to, sender, e.subject, e.content) } catch(err) { }
        await db_email.update({ id: e.id, send_status: true }, conf.ENDPOINT.smsemail)
    }
}

const email = async function(key) {
    if (key && key.sender) {
        let res = await db_email.query(conf.ENDPOINT.smsemail)
        if (res) { res.map(async e => await _email(e, (e.from ? e.from : key.sender))) }
    }
}

// 手机应用提示
const whatsapp = async function(sid, token, sender) {
    
}

module.exports = {
    note,
    email,
    whatsapp
}