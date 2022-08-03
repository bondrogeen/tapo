"use strict";

var _P = _interopRequireDefault(require("./devices/P110"));

var _config = _interopRequireDefault(require("./config/"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var p100 = new _P["default"](_config["default"]);
p100.handshake().then(function () {
  p100.login().then(function () {
    p100.getDeviceInfo().then(function (sysInfo) {
      p100.setPowerState(true);
      p100.setPowerState(false);
    })["catch"](function (e) {
      console.log(e);
    });
  })["catch"](function (e) {
    console.log(e);
  });
})["catch"](function (e) {
  console.log(e);
});