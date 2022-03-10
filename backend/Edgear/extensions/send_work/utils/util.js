
const moment = require('moment')

// 减出时间，通过 天
const time_num = function(src, num) {
    src = src ? src : new Date()
    return src ? moment(src).add(num, 'd').format('yyyy-MM-DD') : null
}

// 对比时间, n > o 则 true
const time_contrast = function(n, o) {
    return moment(n).diff(o) > 0
}
// 对比时间相等
const time_equal = function(n, o = new Date()) {
    o = moment(o).format('yyyy-MM-DD')
    n = moment(n).format('yyyy-MM-DD')
    return moment(o).diff(n) == 0
} 

module.exports = {
    time_num,
    time_equal,
    time_contrast
}