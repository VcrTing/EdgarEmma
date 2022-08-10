

const content = require('./sci-cont')
const instant = require('../../../extensions/send_work/instant')
const smstrapi = require('../../../plugins/smstrapi/api/index')
module.exports = {
    /*
        {
            to_email: 'vcrting@163.com',
            to_note: '+852 92779625',
            email: 'vcrting@163.com',
            code: '123456',
            send_way: [ 'email', 'note' ]
        }

更新：
/root/SAVE/EdgarEmma/backend/Edgear/extensions
cp ./smstrapi ~/edgaremma-crm/plugins/smstrapi
cp ./sc-instant.js ~/edgaremma-crm/api/send-code/controllers/sc-instant.js
    */
    // 及时发送 验证码
    async send_code(ctx) {
        const _whatsapp = smstrapi.conf.KEY_WHATSAPP
        let dat = ctx.request.body
        const send_way = dat.send_way ? dat.send_way.split('_') : [ ]
        
        let res = [ ]
        send_way.map(async e => {
            if (e != _whatsapp) {
                res.push( await smstrapi.instant(
                    e, dat[ 'to_' + e ], 
                    content[e].subject(dat.code), content[e].content(dat[ 'email' ], dat.code) )
                )
            } else {
                // 发送验证码给 whatsapp
                await smstrapi.instant_whatsapp.send_code(
                    dat.code, 
                    dat[ 'to_' + _whatsapp ]
                )
            }
        })

        return res
    },
    // 即时发送新增提醒
    async send_add_remind(ctx) {
        let dat = ctx.query // ctx.request.body
        const send_way = dat.send_way ? dat.send_way.split('_') : [ ]
        const comp = await strapi.services['company'].find({ id: dat.company })

        if (comp) {
            const phs = comp.phones
            const ems = comp.emails
    
            send_way ? send_way.map(async e => {
                instant.remind[ e ](
                    dat.company_name, dat[ 'to_' + e ]
                )
            }) : 0
        }
        return comp
    }
};
