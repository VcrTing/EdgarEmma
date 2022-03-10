
const db_send = 'send'


const saveSend = async function(src) {
    let send = await strapi.query(db_send).find({ remind: src.remind, work_year: src.work_year, send_active: true }, null )
    if (send && send.length > 0) {
        return null
    } else {
        src.send_active = true
        src.send_finish = false
        return await strapi.query(db_send).create( src )
    }
}

module.exports = {
    saveSend
}