const nodemailer = require('nodemailer');
// const sgTransport = require('nodemailer-sendgrid-transport');
const {google} = require('googleapis');
const CLIENT_ID = '205256503792-k9al0i28p599mbteu4l3d6vpisrj8ujt.apps.googleusercontent.com'
// const CLIENT_ID ='630668604540-9gelb99035e2urd5mkogu2iifomhg3li.apps.googleusercontent.com'
const CLIENT_SECRET ='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'
const REDIRECT_URI ='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN='1//04WT1U8G21azmCgYIARAAGAQSNwF-L9IrsijHacGlS3tb4C4TOALoAbZxaJh0oF1sGAQWutAXkTjTYfkPH8kNxX3o3zJ_FzjOKXk'



const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,  CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token : REFRESH_TOKEN })


// const mailer = nodemailer.createTransport(sgTransport(options));
const accessToken =  oAuth2Client.getAccessToken()
const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        type:'OAuth2',
        user:'mm7853355@gmail.com',
        clientId : CLIENT_ID,
        clientSecret : CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken:accessToken

    }
})

exports.sendMailTo = async (emailsArr, link) => {
    var email = {
        to: emailsArr,
        from: 'mm7853355@gmail.com', //registered Email on sendgrid
        subject: 'Verify Account',
        text: 'Account Authantication',
        html: `<a href=${link} >
         <button style="color: green"> Verify Account </button>
          </a>`
    };

    const result = new Promise((resolve, reject) => {

        transport.sendMail(email, function (err, res) {
            if (err) {
                reject(err)
            }
            resolve(res)
        });

    })

    return await result

}