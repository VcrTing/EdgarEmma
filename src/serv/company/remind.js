
import _tool from '../_tool'

const create = async function(vue, data) {
    let res = await vue.net.post('remind', _tool.token(vue), data)
    return res
}

const remind_update = async function(vue, data) {
    let res = await vue.net.put('remind', data.id, _tool.token(vue), data)
    return res
}

// 提醒的改动
const remind_update_for_send = async function() {
    // 1. 首发不需要更改，
    // 2. 更改提醒暂时也不用做
    // 3. 删除 work_year 为今年的 SEND
    // 4. Remind 的 Work_year 改为 _
    // 5. 改动 Remind 的讯息
    
}

export default {
    create,
    remind_update
}
