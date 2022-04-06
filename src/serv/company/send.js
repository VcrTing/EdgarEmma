
import _tool from '../_tool'

const build_search = function(q) {
    let res = { _limit: 99 }
    if (q) {
        if (Number.parseInt(q)) { res['tax_id_contains'] = Number.parseInt(q)
        } else { res['names_contains'] = q  } }
    return res
}

const many = async function( vue, data = { _limit: 99 }) {
    let res = await vue.net.get('send', _tool.token(vue), data)
    // res.data = vue.view.clean( res )
    return res
}


export default {
    many,
}

