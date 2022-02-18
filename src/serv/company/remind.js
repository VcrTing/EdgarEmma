
import _tool from '../_tool'

const create = async function(vue, data) {
    let res = await vue.net.post('remind', _tool.token(vue), data)
    return res
}

const remind_update = async function(vue, data) {
    let res = await vue.net.put('remind', data.id, _tool.token(vue), data)
    return res
}

export default {
    create,
    remind_update
}
