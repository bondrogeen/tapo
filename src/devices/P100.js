import Base from '../base/Base';

export default class P100 extends Base {
  constructor({ ip, email, password, timeout = 5 }) {
    super({ ip, email, password, timeout })
  }

  async setPowerState(state) {
    const payload = {
      method: 'set_device_info',
      params: {
        device_on: state,
      },
      terminalUUID: this.terminalUUID,
      requestTimeMils: Math.round(Date.now() * 1000),
    };
    return this.onRequestToken(payload);
  }
}
