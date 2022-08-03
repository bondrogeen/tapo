"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var ERROR_CODES = {
  "0": "Success",
  "-1010": "Invalid Public Key Length",
  "-1012": "Invalid terminalUUID",
  "-1501": "Invalid Request or Credentials",
  "1002": "Incorrect Request",
  "-1003": "JSON formatting error ",
  "9999": "Session Timeout",
  "-1301": "Device Error",
  "1100": "Handshake Failed",
  "1111": "Login Failed",
  "1112": "Http Transport Failed",
  "1200": "Multiple Requests Failed",
  "-1004": "JSON Encode Failed",
  "-1005": "AES Decode Failed",
  "-1006": "Request Length Error",
  "-2101": "Account Error",
  "-1": "ERR_COMMON_FAILED",
  "1000": "ERR_NULL_TRANSPORT",
  "1001": "ERR_CMD_COMMAND_CANCEL",
  "-1001": "ERR_UNSPECIFIC",
  "-1002": "ERR_UNKNOWN_METHOD",
  "-1007": "ERR_CLOUD_FAILED",
  "-1008": "ERR_PARAMS",
  "-1101": "ERR_SESSION_PARAM",
  "-1201": "ERR_QUICK_SETUP",
  "-1302": "ERR_DEVICE_NEXT_EVENT",
  "-1401": "ERR_FIRMWARE",
  "-1402": "ERR_FIRMWARE_VER_ERROR",
  "-1601": "ERR_TIME",
  "-1602": "ERR_TIME_SYS",
  "-1603": "ERR_TIME_SAVE",
  "-1701": "ERR_WIRELESS",
  "-1702": "ERR_WIRELESS_UNSUPPORTED",
  "-1801": "ERR_SCHEDULE",
  "-1802": "ERR_SCHEDULE_FULL",
  "-1803": "ERR_SCHEDULE_CONFLICT",
  "-1804": "ERR_SCHEDULE_SAVE",
  "-1805": "ERR_SCHEDULE_INDEX",
  "-1901": "ERR_COUNTDOWN",
  "-1902": "ERR_COUNTDOWN_CONFLICT",
  "-1903": "ERR_COUNTDOWN_SAVE",
  "-2001": "ERR_ANTITHEFT",
  "-2002": "ERR_ANTITHEFT_CONFLICT",
  "-2003": "ERR_ANTITHEFT_SAVE",
  "-2201": "ERR_STAT",
  "-2202": "ERR_STAT_SAVE",
  "-2301": "ERR_DST",
  "-2302": "ERR_DST_SAVE"
};
var _default = ERROR_CODES;
exports["default"] = _default;