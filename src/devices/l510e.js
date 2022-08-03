import P100 from './P100';

export default class L510 extends P100 {
  constructor({ ip, email, password, timeout = 5 }) {
    super({ ip, email, password, timeout });
  }
  async setBrightness(brightness) {
    const payload = {
      method: 'set_device_info',
      params: {
        brightness: brightness,
      },
      requestTimeMils: Math.round(Date.now() * 1000),
    };
    return this.onRequestToken(payload);
  }
}
