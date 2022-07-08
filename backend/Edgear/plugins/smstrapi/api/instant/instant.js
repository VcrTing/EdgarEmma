const conf = require('../../conf')
const key = require('../../work/data/key')
const emaii = require('../../work/api/mailgun')

const _email = async function(fac, ky, to, subject, content) {
    let res = await emaii.send(fac, ky.sid, conf.COMPANY_EMAIL, to, subject, content)
    console.log('即时发送的 结果 =', res)
}

module.exports = {
    email: async (to, subject, content) => {
        const ky = await key[ conf.KEY_EMAIL ]( conf.KEY_EMAIL )
        if (ky && ky.sid) {
            const fac = mailgun.factory(key.sid, key.token)
            console.log('FAC =', fac)
            if (fac) {
                await _email(fac, ky, to, subject, content)
            }
        }
    }
}