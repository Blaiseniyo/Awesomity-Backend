import sgMail from "@sendgrid/mail";
import 'dotenv/config';
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (userInfo) =>{
    const mailOptions = {
      from:{name:"Awesomity",email:process.env.SENDGRID_SENDER_EMAIL},
      to: userInfo.email,
      subject: userInfo.subject,
      html: userInfo.body
    };
    try {
      const sendmail = await sgMail.send(mailOptions);
      return sendmail;
    }
    catch(err){
       return err;;
    }
  }
  export default sendEmail; 