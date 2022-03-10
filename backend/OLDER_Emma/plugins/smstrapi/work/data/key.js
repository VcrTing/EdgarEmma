const conf = require('../conf')

const _ser = function(res) {
    res = res ? res[0] : null
    return res ? { sid: res.key, token: res.token + res.token_suffix, sender: res.sender } : { }
}

module.exports = {
    note: async (key_type) => _ser( await strapi.entityService.find( { key_type , status: true}, { model: conf.ENDPOINT.key } ) ),
    email: function () {  },
    whatsapp: function () { }
}