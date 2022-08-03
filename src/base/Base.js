import Cipher from './Cipher';
import ERROR_CODES from './errorsCodes';
import axios from 'axios';

export default class Base {
  constructor({ ip, email, password, timeout = 5 }) {
    this.ERROR_CODES = ERROR_CODES;
    this.cipher = new Cipher();

    this.cookie = '';
    this.token = '';
    this.ip = ip;
    this.url = `http://${ip}/app`;
    
    this.encodedPassword = this.cipher.encodedPassword(password);
    this.encodedEmail = this.cipher.encodedEmail(email);
    this.publicKey = this.cipher.getPublicKey();

    this.info = {};
    this.terminalUUID = this.cipher.uuid();
    this.timeout = timeout;
  }

  getConfig() {
    return {
      headers: {
        Cookie: this.cookie,
        Connection: 'Keep-Alive',
      },
      timeout: this.timeout * 1000,
    };
  }

  async handshake() {
    try {
      const { data, headers } = await this.onRequest({
        method: 'handshake',
        params: {
          key: this.publicKey,
          requestTimeMils: Math.round(Date.now() * 1000),
        },
      });
      if (!data && !headers) return;
      const encryptedKey = data.result.key.toString('utf8');
      this.cipher.decode_handshake_key(encryptedKey);
      this.cookie = headers['set-cookie'][0].split(';')[0];
      return;
    } catch (error) {
      console.log(error);
    }
  }
  async login() {
    const data = {
      method: 'login_device',
      params: {
        username: this.encodedEmail,
        password: this.encodedPassword,
      },
      requestTimeMils: Math.round(Date.now() * 1000),
    };
    try {
      const { token } = await this.onRequestToken(data, this.url);
      this.token = token;
      return token;
    } catch (error) {
      console.log(error);
    }
  }

  async getDeviceInfo() {
    const last_update = this.info?.last_update || 0;
    if (Date.now() - last_update < 2000) {
      return this.info;
    }
    const res = await this.onRequestToken({
      method: 'get_device_info',
      requestTimeMils: Math.round(Date.now() * 1000),
    });
    this.info = res;
    this.info.last_update = Date.now();
    return res;
  }

  async onRequestToken(payload, url = `${this.url}?token=${this.token}`) {
    if (this.cipher.isTrue) {
      try {
        const res = await this.onRequest(
          {
            method: 'securePassthrough',
            params: {
              request: this.cipher.encrypt(payload),
            },
          },
          url
        );

        const decrypted = this.cipher.decrypt(res.data.result.response);
        const response = JSON.parse(decrypted);
        return this.onError(response) ? {} : response.result;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async onRequest(payload, url = this.url) {
    try {
      const res = await axios.post(url, payload, this.getConfig());
      this.onError(res.data);
      return res;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  onError(data) {
    if (data.error_code) {
      console.log(' Error Code: ' + data.error_code + ', ' + this.ERROR_CODES[data.error_code]);
      return true;
    } else {
      return false;
    }
  }
}
