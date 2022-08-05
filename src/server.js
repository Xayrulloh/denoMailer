const express = require('express'), app = express(), nodemailer = require('nodemailer'), path = require('path'), cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cors())
process.env.PORT = process.env.PORT || 5000

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mensShirtUz@gmail.com',
        pass: 'kbxkhmvembeoqcur',
    }
})

let mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) return console.log(err.message);
        console.log('ok', info);
    })
}

app.post('/sendEmail', (req, res) => {
    let {username, phone, message} = req.body
    if (username.length < 3 || username.length > 30 || username.split(' ').length > 2 || !/^[+]998([012345789][012345789]|6[125679]|7[01234569])[0-9]{7}$/.test(phone) || message.length < 10 || message.length > 150) return res.json({status: 400, message: 'You missed something'})

    mailer({
        from: 'mensShirtUz@gmail.com',
        to: 'mensShirtUz@gmail.com',
        subject: 'Mens Shirt',
        text: `Ismi: ${username}\nTelefon raqami: ${phone}\nSms: ${message}\n`,
    })
    res.json({status: 200, message: 'OK'})
})

app.post('/sendPhone', (req, res) => {
    let {username, phone} = req.body
    if (username.length < 3 || username.length > 30 || username.split(' ').length > 2 || !/^[+]998([012345789][012345789]|6[125679]|7[01234569])[0-9]{7}$/.test(phone)) return res.json({status: 400, message: 'You missed something'})
    mailer({
        from: 'mensShirtUz@gmail.com',
        to: 'mensShirtUz@gmail.com',
        text: `Ismi: ${username}\nTelefon raqami: ${phone}`,
    })
    res.json({status: 200, message: 'OK'})
})

app.post('/sendMessage', (req, res) => {
    let {message, phone} = req.body
    if (!/^[+]998([012345789][012345789]|6[125679]|7[01234569])[0-9]{7}$/.test(phone) || !['Пошить', 'Лекала', 'Принт', 'Вышивка', 'Консультация'].includes(message)) return res.json({status: 400, message: 'You missed something'})

    mailer({
        from: 'mensShirtUz@gmail.com',
        to: 'mensShirtUz@gmail.com',
        text: `Message: ${message}\nTelefon raqami: ${phone}`,
    })
    res.json({status: 200, message: 'OK'})
})

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../', 'public', 'html', 'main.html')))
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, '../', 'public', 'html', 'contact.html')))
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, '../', 'public', 'html', 'about.html')))

app.listen(process.env.PORT, () => {
    console.log('Server running on http://localhost:' + process.env.PORT);
})