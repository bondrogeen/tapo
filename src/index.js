import P100 from './devices/P100';
import config from './config/';

const p100 = new P100(config);

p100
  .handshake()
  .then(() => {
    p100
      .login()
      .then(() => {
        p100
          .getDeviceInfo()
          .then(sysInfo => {
            p100.setPowerState(true);
            p100.setPowerState(false);
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(e => {
        console.log(e);
      });
  })
  .catch(e => {
    console.log(e);
  });
