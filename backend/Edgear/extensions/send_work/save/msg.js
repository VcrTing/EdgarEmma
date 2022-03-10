module.exports = {
    'note': [
        { id: 1, subject: '', content: '这里是普通的短信' }
    ],
    'email': [
        { id: 1, subject: '这里是一封测试电邮', content: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <div class="box">
                <h2>Hi</h2>
                <p>my names vcrting.</p>
            </div>
            <style>
                html { color: #222325; }
                p { color: #67686b; }
                h2 { line-height: 2.4em }
                .box { padding: 24px; border-radius: 7px; background-color: #f7f8f9; text-align: center; }
            </style>
        </body>
        </html>` }
    ],
    'whatsapp': [
        { id: 1, subject: '', content: '这里是普通的Whatsapp 信息' }
    ],

    'error': { id: 0, subject: '錯誤提示', content: '您尚未選擇發送內容。' }
}