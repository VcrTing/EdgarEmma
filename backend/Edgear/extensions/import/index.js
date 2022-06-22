const fs = require('fs')

const F = __dirname + '/SAVE/'


const import_company = function(k = 'company') {
    return
    // 读取 CSV 文件夹
    fs.readdir(F + k, 'utf8', function(err, dt) {
        
        if (dt) {
            dt.map(e => {

                fs.readFile(F + k + '/' + e, 'utf8', function(er, d) {
                    console.log('D =', d.split('\r'))
                })
            })
        }

    })

    // 循环单文件

    // 读取内容

    // 序列化数据

    // 查询是否有相同

    // 插入数据

    // 殿后
}

module.exports = {
    import_company
}