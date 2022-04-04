module.exports = {
    'note': [
        { id: 1,
            params: { 
                user_email: '',
                company_named: '',
                filling_timed: ''
            }, 
            subject: '', content: '你好，提提你，你旗下 {{company_named}} 公司需要在30天內完成報稅，遲左會罰款架。' }
    ],
    'email': [
        { id: 1, 
            params: { 
                user_email: '',
                company_named: '',
                filling_timed: ''
            },
            subject: 'EdgarEmma 纳税提醒', content: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>纳税日提醒</title>
            </head>
            <body>
                <div class="box">
                    <img src="https://edgaremma.com/wp-content/uploads/Edgaremma-logo.png" class="Logo" />
                    <h2>Hi，Dear {{user_email}}.</h2>
                    <p>您的{{company_named}}将于{{filling_timed}}到达法定纳税时间，望您提前做好安排。</p>
                </div>
                <style>
                    html { color: #1e1f22; }
                    p { color: #58595c; }
                    .box { padding: 24px; border-radius: 7px; background-color: #f7f8f9; text-align: center; }
                    .Logo { margin: 24px; max-width: 320px; }
                </style>
            </body>
            </html>` 
        }
    ],
    'whatsapp': [
        { id: 1, subject: '', content: '这里是普通的Whatsapp 信息' }
    ],

    'error': { id: 0, subject: '錯誤提示', content: '您尚未選擇發送內容。' }
}