const conf = require('./_conf')

// 在 hor 的 第几分钟
const hour = function(hor = [ 1, 4, 7, 10, 13, 16, 19, 22 ], min = 1) {
    const d = new Date()
    let h = d.getHours(); h = h ? Number.parseInt(h) : 0
    return hor.indexOf(h) >= 0 && d.getMinutes() == min
}

export default {
    impor: () => {
        const trg = {
            aiive: true, start: '2020-12-01', end: '2020-12-02',
            origin_
        }
    }
}