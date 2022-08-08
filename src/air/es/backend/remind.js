const WAY_WHATSAPP = 'whatsapp'

const SEND_WAY = [ 'note', 'email', WAY_WHATSAPP ]
const SEND_WAY_TXT = {
    'email': { v: 'email', def: true, txt: '電郵提示', id: "way_email", class: 'checkbox-need', require: true },
    // 'note': { v: 'note', def: true, txt: '短信提示', id: "way_note", class: 'pl', require: false },
    WAY_WHATSAPP: { v: WAY_WHATSAPP, def: true, txt: 'Whatsapp 推送', id: "way_" + WAY_WHATSAPP, class: 'pl', require: false },
}

const SEND_WAY_DEF = WAY_WHATSAPP + '_email'

const send_way_world = function(sw) {
    return sw.join('_')
}

const build_rule = function() {
    return [
        { "day": -30 },
        { "day": -7 },
        { "day": 0 }
    ]
}

export default {
    send_way_world,
    build_rule,

    SEND_WAY,
    SEND_WAY_TXT,
    SEND_WAY_DEF,

    WAY_WHATSAPP
}