
const SEND_WAY = [ 'note', 'email', 'whatsapp' ]
const SEND_WAY_TXT = {
    'email': { v: 'email', def: true, txt: '電郵提示', id: "way_email", class: '' },
    'note': { v: 'note', def: true, txt: '短信提示', id: "way_note", class: 'pl' },
}

const SEND_WAY_DEF = 'note_email'

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
    SEND_WAY_DEF
}