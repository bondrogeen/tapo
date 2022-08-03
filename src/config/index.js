import dotenv from 'dotenv';
const { config } = dotenv;
config();

export default {
  ip: process.env.IP || '192.168.1.10',
  email: process.env.EMAIL || 'emial',
  password: process.env.PASSWORD || 'password',
  timeout: 5,
};
