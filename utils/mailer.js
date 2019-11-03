// utils -> mailer

import {
  stripTags,
} from 'bellajs';

import {
  createTransport,
} from 'nodemailer';

import {
  error,
  info,
} from './logger';

const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'gosmtp.sender',
    pass: 'wdjY4yYEd2eVQzA',
  },
});

transporter.verify((err) => {
  if (err) {
    error(err);
  } else {
    info('Mailer engine is ready');
  }
});

export const send = (message) => {
  const envelop = {
    from: '"Article Parser Demo" <gosmtp.sender@gmail.com>',
    to: '"Dong Nguyen" <ndaidong@gmail.com>',
    subject: 'Article Parser demo - Extracting failed',
    text: stripTags(message),
    html: message,
  };
  transporter.sendMail(envelop, (err) => {
    if (err) {
      error(err);
    } else {
      info('Message has been sent');
    }
  });
};
