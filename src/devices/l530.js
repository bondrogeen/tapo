export default class L530 extends L110 {
  constructor({ ip, email, password, timeout = 5 }) {
    super({ ip, email, password, timeout });
  }

  async setColorTemp(color_temp) {
    const transformedColorTemp = this.transformColorTemp(color_temp);
    const roundedValue = transformedColorTemp > 6500 ? 6500 : transformedColorTemp < 2500 ? 2500 : transformedColorTemp;
    const payload = {
      method: 'set_device_info',
      params: {
        hue: 0,
        saturation: 0,
        color_temp: roundedValue,
      },
      requestTimeMils: Math.round(Date.now() * 1000),
    };
    return await this.onRequestToken(payload);
  }
  async setColor(hue = 0, saturation = 0) {
    const payload = {
      method: 'set_device_info',
      params: {
        hue: Math.round(hue),
        color_temp: 0,
        saturation: Math.round(saturation),
      },
      requestTimeMils: Math.round(Date.now() * 1000),
    };
    return await this.onRequestToken(payload);
  }
  transformColorTemp(value) {
    return Math.floor(1000000 / value);
  }
  async getColorTemp() {
    return super.getDeviceInfo().then(() => {
      return this.calculateColorTemp(this.getSysInfo().color_temp);
    });
  }
  calculateColorTemp(tapo_color_temp) {
    const newValue = this.transformColorTemp(tapo_color_temp);
    return newValue > 400 ? 400 : newValue < 154 ? 154 : newValue;
  }
}
