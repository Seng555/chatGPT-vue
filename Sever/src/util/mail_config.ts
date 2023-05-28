import nodemailer from 'nodemailer';

export const mail = nodemailer.createTransport({
    host: "in-v3.mailjet.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "27e15923c90cbfe97653178a34e05c4a", // generated ethereal user
      pass: "9219a482bff5c6b7fed69d34247cfa43", // generated ethereal password
    },
  });

export const mail_admin = '"Updoun Bot ðŸ‘»" <eeyang5@gmail.com>';