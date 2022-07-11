
import _tool from '../_tool/index'

export default {
    async code_send(vue, code, to) {
        const _user = vue.$store.state.user
        return await vue.net.post('sms_code', _tool.token(vue), {
            code, to, user_id: _user ? _user.id : ''
        })
    }
}