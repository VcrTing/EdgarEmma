
const db_snd = 'send'
const db_rmd = 'remind'

const updRemind = async function(id, rmd) {
    return await strapi.query(db_rmd).update({ id }, rmd)
}

const updSend = async function(id, snd) {
    return await strapi.query(db_snd).update({ id }, snd)
}
const updSend_Result = async function(snd) {
    const id = snd.id 
    const data = { times: snd.times, is_serial: true }
    return await strapi.query(db_snd).update({ id }, data)
}

module.exports = {
    updSend,
    updSend_Result,
    updRemind
}