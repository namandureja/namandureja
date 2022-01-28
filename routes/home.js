const express = require("express");
require("dotenv").config();

const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const CLIENT_ID=process.env.CLIENT_ID;
const CLIENT_SECRET=process.env.CLIENT_SECRET;
const REFRESH_TOKEN=process.env.REFRESH_TOKEN;
const REDIRECT='https://developers.google.com/oauthplayground'
const oauth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT);
oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});


const router = express.Router();
router.get('/',(req,res)=>{
    res.render("profile");
})

router.get('/projects',(req,res)=>{
    res.render("projects");
})

router.get('/experience',(req,res)=>{
    res.render("experience");
})

router.get('/contact',(req,res)=>{
    res.render("contact");
})

router.get('/resume',(req,res)=>{
    res.send("Err");
})

router.post('/submit',async (req,res)=>{   
    const accessToken= await oauth2Client.getAccessToken();
    res.json({
        message: "Success"
        });
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'durejanaman29@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
        }
    });
    let mailDetails = {
        from: 'Naman Dureja <durejanaman29@gmail.com>',
        to: req.body.email,
        subject: 'ndureja.com',
        html: '<p>Dear '+req.body.name+',<br><br>Thank you for contacting me. I have received your message and will get back to you within 24 hours. Until then, you can give me a call anytime at +91 88603 97569 or email me at hello@ndureja.com.<br><br>Thanks and regards,<br>Naman Dureja</p>'
    };
    mailTransporter.sendMail(mailDetails, async function(err, data) {
        if(err) {
            console.log(err);
           
        } else {
           console.log('success')
           mailDetails.to='durejanaman29@gmail.com';
           mailDetails.html=`<p>Hi Naman!<br><br>You have recieved a message on your website. The details are : <br><br><strong>From : </strong>`+req.body.name+`<br><strong>Email : </strong>`+req.body.email+`<br></strong>Message : `+req.body.message;
          await  mailTransporter.sendMail(mailDetails);
        }
    });  
})
module.exports = router;