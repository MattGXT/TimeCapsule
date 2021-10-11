const nodemailer = require("nodemailer");

async function sendMail(address, code) {
    let transporter = nodemailer.createTransport({
        host: "smtp.exmail.qq.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "no-reply@twillt.cc", // generated ethereal user
            pass: "Znt5etHhSyUpsF5a", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Twillt" <no-reply@twillt.cc>', // sender address
        to: address, // list of receivers
        subject: "感谢您注册twillt会员", // Subject line
        text: "您的验证码为：" + code, // plain text body
        html: "您的验证码为：<br><a href='http://localhost:3000/verify?code=" + code +"'>Click here</a>",
    });

    console.log("Message sent: %s", info.messageId);
}

module.exports = { sendMail }