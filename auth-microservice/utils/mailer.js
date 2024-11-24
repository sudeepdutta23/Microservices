const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MailerEmail,
    pass: process.env.MailerEmailPassword
  }
});

const sendMail = async (to, subject, text, html) => {
  const mailOptions = {
    from: 'Your Name <your_email@gmail.com>',
    to,
    subject
  };
  if(html) mailOptions.html = html;
  else mailOptions.text = text

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendMail;