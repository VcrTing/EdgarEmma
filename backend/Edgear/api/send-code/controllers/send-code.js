'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const db = 'send_codes'; const moment = require('moment')
const content = {
    'subject': (cd) => { return `【${cd}】EdgarEmma 表單的電子郵件驗證碼` },
    'content': (to, code) => { return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>电邮地址验证码</title>
    </head>
    <body>
        <div class="box">
            <h2>你好，这里是EdgarEmma，请验证您的电邮地址。 </h2>
            <p>您填入的电邮地址为 ${to}。该电邮地址对应的验证码为：<b>${code}</b></p>
            <p>如有查詢，請電郵info@EdgarEmma.com</p>
        </div>
        <style>
            html { color: #1e1f22; }
            p { color: #58595c; }
            .box { padding: 24px; border-radius: 7px; background-color: #f7f8f9; text-align: center; }
            .Logo { margin: 24px; max-width: 320px; }
        </style>
    </body>
    </html>` }
}
const smstrapi = require('../../../plugins/smstrapi/api/index')
module.exports = {

    async vertify_code(ctx) {
        const _now = moment(new Date()).format('yyyy-MM-DD hh:mm:ss')
        let dat = { code: '12345', to: 'vcrting@163.com', user_id: '1' }

        let em = await smstrapi.insert.email(
            _now, dat.to, 
            content.subject(dat.code), 
            content.content(dat.to, dat.code), ' ')
        return em
    }
};
