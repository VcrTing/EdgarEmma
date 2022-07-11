

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
            <h2>你好，这里是<span>EdgarEmma</span>，请验证您的电邮地址。 </h2>
            <p>您填入的电邮地址为 ${to}。该电邮地址对应的验证码为：<b>${code}</b></p>
            <p>如有查詢，請電郵<a href="mailto:info@EdgarEmma.com">info@EdgarEmma.com</a></p>
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
    async send_code(ctx) {
        let dat = ctx.request.body // { code: '12345', to: 'vcrting@163.com', user_id: '1' }
        return await smstrapi.instant.email(dat.to, 
            content.subject(dat.code), content.content(dat.to, dat.code) )
    }
};
