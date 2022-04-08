
import _tool from '../_tool'

const build_search = function(q) {
    let res = { _limit: 99 }
    if (q) {
        if (Number.parseInt(q)) { res['tax_id_contains'] = Number.parseInt(q)
        } else { res['names_contains'] = q  } }
    return res
}

const many = async function( vue, data = { _limit: 99 }) {
    console.log('data =', data)
    let res = await vue.net.get('send', _tool.token(vue), data)
    // res.data = vue.view.clean( res )
    return res
}

const one = async function(vue, id) {
    let res = await vue.net.get_one('send', id, _tool.token(vue), null)
    return res
}

const trash = async function(vue, data) {
    return await vue.net.trash('send', data.id, _tool.token(vue))
}

export default {
    one,
    many,
    trash
}

