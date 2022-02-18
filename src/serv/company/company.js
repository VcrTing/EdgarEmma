
import _tool from '../_tool'

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
const company_search = async function(vue, q) {
    let res = await vue.net.get('company', _tool.token(vue), build_search(q))
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
const company_origin_plus = async function(vue, data) {
    let res = null
    try {
        res = await vue.net.post('company_origin', _tool.token(vue), data)
    } catch(err) {
        res = { fail: true, code: 500 }
        res['code'] = _tool.catch_err(err + '')
    }
    return res
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


export default {
    company,
    company_one,
    company_plus,
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