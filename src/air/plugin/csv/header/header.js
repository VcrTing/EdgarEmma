const header_company = function(hd) {
    return hd.map(e => {
        switch(e) {
            case 'Reg no.': e = 'tax_id'
                break;
            case 'Type': e = 'company_type_txt'
                break;
            case 'Name': e = 'names'
                break;
            case 'Incorp-orated': e = 'company_since'
                break;
        }
        return e
    })
}

export default {
    header_company
}