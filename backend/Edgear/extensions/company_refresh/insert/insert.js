
const csv = require('../util/csv')

const util = require('../util/util')

const ser = require('../serial/ser_company')

module.exports = {
    insert: async (mmt) => {
        util.set_fiie(mmt, (ph) => util.read( util.fiie(mmt), (res) => {
            res = res ? csv.parse_array(res) : undefined
            if (!res) return;
            ser.ser_company()
        }))
    }
}