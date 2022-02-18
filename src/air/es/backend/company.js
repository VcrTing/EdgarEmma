let LANG = [ 'en', 'hk' ]

let COMPANY_TYPE = [
    'Limited Liability Company',
    'Other',
]
const company_type = function(ct) {
    ct = COMPANY_TYPE[ct - 1]
    return ct ? ct : ''
}

const convert_names = function(names) {
    let res = { }
    names.map(n => {
        if (n.lang == 'hk') {
            res.name_ch = n.txt
        } else if (n.lang == 'en') {
            res.name_en = n.txt
        }
    })
    return res
}

export default {
    company_type,
    convert_names
}