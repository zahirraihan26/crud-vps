const nodemailer = require("nodemailer");
const config = require("../config/config");
const logger = require("../config/logger");

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== "test") {
  transport
    .verify()
    .then(() => logger.info("Connected to email server"))
    .catch((err) =>
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}


const sendEmail = async (to, subject, html) => {
  const msg = { from: config.email.from, to, subject, html };
  await transport.sendMail(msg);
};

const sendEmailVerification = async (to, otp) => {
  console.log("sendEmailVerification", to, otp);
  const subject = "User verification code";
  const html = `
  <body style="background-color: #f8fafc; padding: 2.5rem 1rem; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; color: #334155; margin: 0;">
    <div style="max-width: 28rem; margin: 0 auto; background-color: #ffffff; padding: 2.5rem 2rem; border-radius: 1rem; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0; text-align: center;">
        
        <!-- Logo -->
        <img src="https://raw.githubusercontent.com/shadat-hossan/Image-server/refs/heads/main/NEXMOTAG.jpeg"
            alt="NEXMO TAG Logo" style="max-width: 8rem; height: auto; margin-bottom: 1.5rem; border-radius: 0.5rem;">
        
        <!-- Header -->
        <h1 style="font-size: 1.5rem; font-weight: 700; margin: 0 0 0.5rem 0; color: #0f172a; letter-spacing: -0.025em;">
            Welcome to NEXMO TAG
        </h1>
        
        <!-- Subtitle -->
        <p style="color: #64748b; font-size: 0.95rem; line-height: 1.5; margin: 0 0 2rem 0;">
            Thank you for joining us! Please use the verification code below to complete your account setup.
        </p>
        
        <!-- OTP Box -->
        <div style="background: linear-gradient(135deg, #2563eb, #0891b2); color: #ffffff; padding: 1.25rem; border-radius: 0.75rem; font-size: 2.25rem; font-weight: 800; letter-spacing: 0.3em; text-indent: 0.3em; margin-bottom: 1.25rem; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);">
            ${otp}
        </div>
        
        <!-- Instruction & Timer -->
        <p style="color: #475569; font-size: 0.875rem; margin: 0 0 0.5rem 0;">
            Enter this code in your application to proceed.
        </p>
        
        <div style="display: inline-block; background-color: #fef2f2; border: 1px solid #fee2e2; padding: 0.4rem 0.8rem; border-radius: 9999px; margin-top: 0.75rem;">
            <p style="color: #dc2626; font-size: 0.8rem; font-weight: 600; margin: 0;">
                ⏱️ Code expires in <span id="timer">03:00</span> minutes
            </p>
        </div>

        <!-- Divider -->
        <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 2rem 0 1.25rem 0;">
        
        <!-- Footer Link -->
        <a href="https://shadat-hossain.netlify.app" style="color: #94a3b8; font-size: 0.75rem; text-decoration: none; font-weight: 500; transition: color 0.2s;" target="_blank">
            Developed by Shadat Hossain
        </a>
    </div>
</body>
`;
  await sendEmail(to, subject, html);
};

const sendResetPasswordEmail = async (to, otp) => {
  console.log("Password Reset Email", to, otp);
  const subject = "Password Reset Email";
  const html = `
    <body style="background-color: #f8fafc; padding: 2.5rem 1rem; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; color: #334155; margin: 0;">
    <div style="max-width: 28rem; margin: 0 auto; background-color: #ffffff; padding: 2.5rem 2rem; border-radius: 1rem; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0; text-align: center;">
        
        <!-- Logo -->
        <img src="https://raw.githubusercontent.com/shadat-hossan/Image-server/refs/heads/main/NEXMOTAG.jpeg"
            alt="NEXMO TAG Logo" style="max-width: 7.5rem; height: auto; margin-bottom: 1.5rem; border-radius: 0.5rem;">
        
        <!-- Header -->
        <h1 style="font-size: 1.5rem; font-weight: 700; margin: 0 0 0.5rem 0; color: #0f172a; letter-spacing: -0.025em;">
            Password Reset Request
        </h1>
        
        <!-- Subtitle -->
        <p style="color: #64748b; font-size: 0.95rem; line-height: 1.5; margin: 0 0 1.75rem 0;">
            You requested a password reset for your account. Use the code below to complete the reset process:
        </p>
        
        <!-- OTP Box -->
        <div style="background: linear-gradient(135deg, #1d4ed8, #0284c7); color: #ffffff; padding: 1.25rem; border-radius: 0.75rem; font-size: 2.25rem; font-weight: 800; letter-spacing: 0.3em; text-indent: 0.3em; margin-bottom: 1.25rem; box-shadow: 0 4px 12px rgba(29, 78, 216, 0.25);">
            ${otp}
        </div>
        
        <!-- Expiry Badge -->
        <div style="display: inline-block; background-color: #fff7ed; border: 1px solid #ffedd5; padding: 0.4rem 0.85rem; border-radius: 9999px; margin-bottom: 1.25rem;">
            <p style="color: #c2410c; font-size: 0.8rem; font-weight: 600; margin: 0;">
                ⏱️ Code valid for 3 minutes only
            </p>
        </div>
        
        <!-- Security Note -->
        <p style="color: #94a3b8; font-size: 0.825rem; line-height: 1.4; margin: 0;">
            If you did not request a password reset, please ignore this email or contact support if you have concerns.
        </p>

        <!-- Divider -->
        <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 1.75rem 0 1.25rem 0;">
        
        <!-- Footer Link -->
        <a href="https://shadat-hossain.netlify.app" style="color: #94a3b8; font-size: 0.75rem; text-decoration: none; font-weight: 500;" target="_blank">
            Developed by Shadat Hossain
        </a>
    </div>
</body>
`;
  await sendEmail(to, subject, html);
};


const sendVerificationEmail = async (to, token) => {
  const subject = "Email Verification";
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendEmailVerification,
};
