const conf = require('../../conf')
const key = require('../../work/data/key')
const emaii = require('../../work/api/mailgun')

const _email = async function(fac, sender, to, subject, content) {
    return fac ? await emaii.send(fac, sender, conf.COMPANY_EMAIL, [ to ], subject, content) : null
}

module.exports = {
    email: async (to, subject, content) => {
        let res = ''; const ky = await key[ conf.KEY_EMAIL ]( conf.KEY_EMAIL )
        if (ky && ky.sid) {
            res = await _email(
                emaii.factory(ky.sid, ky.token), ky.sender, to, subject, content)
        }; return res
    }
}