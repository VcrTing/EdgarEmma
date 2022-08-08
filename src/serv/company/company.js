
import _tool from '../_tool'

import remind from './remind'

const build_search = function(q) {
    let res = { _limit: 99 }
    if (q) {
        if (Number.parseInt(q)) { res['tax_id_contains'] = Number.parseInt(q)
        } else { res['names_contains'] = q  } }
    return res
}

const company = async function( vue, data = { _limit: 99 }) {
    let res = await vue.net.get('company', _tool.token(vue), data)
    res.data = vue.view.clean( res )
    return res
}

//
// 内含 我的公司
const company_search = async function(vue, q) {
    let cdt = build_search(q)
    cdt.user = vue.$store.state.user.id
    let res = await vue.net.get('company', _tool.token(vue), cdt)
    res = res ? res : [ ]
    return res.sort((n, o) => (o.id - n.id))
}
const company_origin_search = async function(vue, q) {
    if (q) {
        let res = await vue.net.get('company_origin', _tool.token(vue), build_search(q))
        res = res ? res : [ ]
        return res.sort((n, o) => (o.id - n.id))
    }
}

//
const company_plus = async function(vue, data) {
    let res = await vue.net.post('company', _tool.token(vue), data)
    return res
}
const company_origin_plus = async function(vue, data, caii = null) {
    try {
        return await vue.net.post('company_origin', _tool.token(vue), data)
    } catch(err) {
        caii(err)
    }
}

const company_update = async function(vue, data) {
    let res = await vue.net.put('company', data.id, _tool.token(vue), data)
    return res
}

// 
const company_one = async function(vue, id) {
    let res = await vue.net.get_one('company', id, _tool.token(vue), null)
    return vue.view.clean( res )
}

//
const company_trash = async function(vue, comp) {
    // 1: 仅关闭了 Company，2: 也关闭了 Remind
    let res = await vue.net.put('company', comp.id, _tool.token(vue), { status: false, })
    if (res.id) {
        const rmd = res.remind
        const _rmd = rmd ? await remind.remind_update('remind', { id: rmd.id, is_stop: true }) : 0
        return (_rmd.id) ? 2 : 0
    } return 0
}

export default {
    company,

    company_one,
    company_plus,
    company_trash,
    company_update,

    company_origin_plus,

    company_search,
    company_origin_search
}



    /*
    let res = { _limit: 99, where: {  } }
    if (q) {

        res[ 'where' ][ 'names' ] = q
        res[ 'where' ][ 'tax_id' ] = q
    }
    */