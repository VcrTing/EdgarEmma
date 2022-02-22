const conf = require('../conf')
const utils = require('../util/util')

const query = async function() {
    return await strapi.entityService.find( { params: { send_day_lte: utils.now(), send_status: false , send_active: true } }, { model: conf.ENDPOINT.smsnote } ) 
}

const update = async function(data) {
    return await strapi.entityService.update( { params: { id: data.id }, data }, { model: conf.ENDPOINT.smsnote })
}

module.exports = {
    query,
    update
}