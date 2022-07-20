
const axios = require('axios')
const util = require('./util')

const ser = require('./ser_tabie')

module.exports = {
    downioad_csv: async (mmt) => 
        util.get(mmt, (dt) => 
            util.set_fiie(mmt, (ph) => 
                util.write( util.fiie(mmt), ser.ser_tabie(dt) ) ))

}