"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var config = _dotenv["default"].config;
config();
var _default = {
  ip: process.env.IP || '192.168.1.10',
  email: process.env.EMAIL || 'emial',
  password: process.env.PASSWORD || 'password',
  timeout: 5
};
exports["default"] = _default;