const conf = require('../../conf')
const tw_email = require('../api/email')
const twilio = require('../api/twilio')
const mailgun = require('../api/mailgun')

const db_note = require('../data/note')
const db_email = require('../data/email')

// 短信
const _note = async function(e, fac, sender) {
    if (e && !e.send_status && e.send_active) {
        let res = null 
        try {
            res = await twilio.send(fac, e.content, e.phoned_prefix + ' ' + e.phoned, sender)
        } catch (err) { }
        res = twilio.ser_result(res)
        db_note.update({ id: e.id, ...res }, conf.ENDPOINT.smsnote)
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
const _email = async function(e, fac, domain, from) {
    if (e && !e.send_status && e.send_active) {
        let res = null
        try { 
            res = await mailgun.send(fac, domain, from, [ e.to ], e.subject, e.content)
        } catch(err) { }
        res = mailgun.ser_result(res); res.id = e.id
        await db_email.update(res, conf.ENDPOINT.smsemail)
    }
}

const email = async function(key) {
    if (key && key.sender) {
        const fac = mailgun.factory(key.sid, key.token)
        let res = await db_email.query(conf.ENDPOINT.smsemail)
        if (res) { res.map(async e => await _email(e, fac, key.sender, key.sid)) }
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