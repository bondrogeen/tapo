import crypto from 'crypto';

const config = {
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
  modulusLength: 1024,
};

export default class TpLinkCipher {
  constructor() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', config);
    this.iv = null;
    this.key = null;
    this.publicKey = publicKey.toString('utf8');
    this.privateKey = privateKey;
  }

  get isTrue() {
    return Boolean(this.key);
  }

  uuid() {
    return crypto.randomUUID();
  }

  encoderBase(data) {
    return Buffer.from(data).toString('base64');
  }

  encodedPassword(password) {
    return this.encoderBase(password);
  }

  encodedEmail(email) {
    return this.encoderBase(crypto.createHash('sha1').update(email).digest('hex'));
  }

  decode_handshake_key(key) {
    const buff = Buffer.from(key, 'base64');
    const decoded = crypto.privateDecrypt(
      {
        key: this.privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      buff
    );
    this.iv = decoded.slice(16, 32);
    this.key = decoded.slice(0, 16);
  }

  getPublicKey() {
    return this.publicKey;
  }

  encrypt(payload) {
    const data = typeof payload === 'object' ? JSON.stringify(payload) : payload;
    const cipher = crypto.createCipheriv('aes-128-cbc', this.key, this.iv);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }

  decrypt(data) {
    const decipher = crypto.createDecipheriv('aes-128-cbc', this.key, this.iv);
    let decrypted = decipher.update(data, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
