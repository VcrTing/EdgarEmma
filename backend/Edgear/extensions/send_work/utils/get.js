const db_rmd = 'remind'
const db_snd = 'send'

// 获取能够 序列化的 Remind
const getRemind = async function (year) {
    let cdt = { _limit: 300, is_stop: false, work_year_ncontains: year }
    let res = await strapi.query(db_rmd).find(cdt, null)
    return res ? res : [ ]
}    

// 获取当前能够 序列化的 Send
const getSend = async function() {
    const y = new Date().getFullYear()
    let res = await strapi.query(db_snd).find({ 
        _limit: 30,
        work_year: y,
        is_serial: false,
        send_active: true,
        send_finish: false,
    }, null)
    res = res ? res : [ ]
    return res.filter(e => (e.send_active && !e.send_finish))
}

module.exports = {
    getSend,
    getRemind
}