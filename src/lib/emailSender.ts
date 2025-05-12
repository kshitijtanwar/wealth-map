// // src/lib/emailSender.ts
// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_USER, // Your Gmail address
//     pass: process.env.GMAIL_APP_PASSWORD, // Your app password
//   },
// });

// interface EmailOptions {
//   to: string;
//   subject: string;
//   html: string;
//   text?: string;
// }

// export const sendEmail = async (options: EmailOptions) => {
//   try {
//     const mailOptions = {
//       from: `"Your App Name" <${process.env.GMAIL_USER}>`,
//       to: options.to,
//       subject: options.subject,
//       html: options.html,
//       text: options.text || '',
//     };

//     const info = await transporter.sendMail(mailOptions);
//     return { success: true, messageId: info.messageId };
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return { success: false, error: error instanceof Error ? error.message : 'Failed to send email' };
//   }
// };