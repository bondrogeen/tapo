import P100 from './P100';

export default class P110 extends P100 {
  constructor({ ip, email, password, timeout = 5 }) {
    super({ ip, email, password, timeout });
    this.consumption;
  }
  async getEnergyUsage() {
    const payload = {
      method: 'get_energy_usage',
      requestTimeMils: Math.round(Date.now() * 1000),
    };
    const result = await this.onRequestToken(payload);
    if (result) {
      this.consumption = {
        current: result.current_power / 1000,
        total: result.today_energy / 1000,
      };
    } else {
      this.consumption = {
        current: 0,
        total: 0,
      };
    }
    return res;
  }
  getPowerConsumption() {
    return this.consumption;
  }
}
