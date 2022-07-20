

const content = require('./sci-cont')
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
    */
    async send_code(ctx) {
        let dat = ctx.request.body
        const send_way = dat.send_way ? dat.send_way.split('_') : [ ]
        
        let res = [ ]
        send_way.map(async e => {
            res.push( await smstrapi.instant(
                e, dat[ 'to_' + e ], 
                content[e].subject(dat.code), content[e].content(dat[ 'email' ], dat.code) )
            )
        })

        return res
    }
};
