const TASK_LIMIT = 20

const ENDPOINT = {
    key: 'plugins::smstrapi.key',
    smsnote: 'plugins::smstrapi.sms-note'
}

const WAY = [ 'note', 'email', 'whatsapp' ]

module.exports = {
    WAY,
    ENDPOINT,
    TASK_LIMIT
}