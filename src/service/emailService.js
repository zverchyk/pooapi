const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
// Replace with your actual email credentials

const transporter = nodemailer.createTransport({
    service: 'gmail', // or use 'smtp.example.com' for custom SMTP
    auth: {
        user: process.env.APP_EMAIL, // Your email
        pass: process.env.APP_EMAIL_PASSWORD, // Your email password or app password
    },
});
const sendMail = function(email, image) {


 // Remove the base64 header "data:image/png;base64,"
 const base64Data = image.replace(/^data:image\/png;base64,/, '');
    
 const mailOptions = {
     from: process.env.APP_EMAIL,
     to: email,
     subject: 'Your Poo Chart',
     html: `<p>Here is your chart as an attachment.</p>`,
     attachments: [
         {
             filename: 'bubble_chart.png',
             content: base64Data,
             encoding: 'base64'
         }
     ]
 };

transporter.sendMail(mailOptions, (error) => {
    if (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send email' });
    } else {
        res.json({ message: 'Email sent successfully!' });
    }
});
}


module.exports ={
    sendMail

  }
  