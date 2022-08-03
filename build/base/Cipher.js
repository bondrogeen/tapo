"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var config = {
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem'
  },
  modulusLength: 1024
};

var TpLinkCipher = /*#__PURE__*/function () {
  function TpLinkCipher() {
    _classCallCheck(this, TpLinkCipher);

    var _crypto$generateKeyPa = _crypto["default"].generateKeyPairSync('rsa', config),
        publicKey = _crypto$generateKeyPa.publicKey,
        privateKey = _crypto$generateKeyPa.privateKey;

    this.iv = null;
    this.key = null;
    this.publicKey = publicKey.toString('utf8');
    this.privateKey = privateKey;
  }

  _createClass(TpLinkCipher, [{
    key: "isTrue",
    get: function get() {
      return Boolean(this.key);
    }
  }, {
    key: "uuid",
    value: function uuid() {
      return _crypto["default"].randomUUID();
    }
  }, {
    key: "encoderBase",
    value: function encoderBase(data) {
      return Buffer.from(data).toString('base64');
    }
  }, {
    key: "encodedPassword",
    value: function encodedPassword(password) {
      return this.encoderBase(password);
    }
  }, {
    key: "encodedEmail",
    value: function encodedEmail(email) {
      return this.encoderBase(_crypto["default"].createHash('sha1').update(email).digest('hex'));
    }
  }, {
    key: "decode_handshake_key",
    value: function decode_handshake_key(key) {
      var buff = Buffer.from(key, 'base64');

      var decoded = _crypto["default"].privateDecrypt({
        key: this.privateKey,
        padding: _crypto["default"].constants.RSA_PKCS1_PADDING
      }, buff);

      this.iv = decoded.slice(16, 32);
      this.key = decoded.slice(0, 16);
    }
  }, {
    key: "getPublicKey",
    value: function getPublicKey() {
      return this.publicKey;
    }
  }, {
    key: "encrypt",
    value: function encrypt(payload) {
      var data = _typeof(payload) === 'object' ? JSON.stringify(payload) : payload;

      var cipher = _crypto["default"].createCipheriv('aes-128-cbc', this.key, this.iv);

      var encrypted = cipher.update(data, 'utf8', 'base64');
      encrypted += cipher["final"]('base64');
      return encrypted;
    }
  }, {
    key: "decrypt",
    value: function decrypt(data) {
      var decipher = _crypto["default"].createDecipheriv('aes-128-cbc', this.key, this.iv);

      var decrypted = decipher.update(data, 'base64', 'utf8');
      decrypted += decipher["final"]('utf8');
      return decrypted;
    }
  }]);

  return TpLinkCipher;
}();

exports["default"] = TpLinkCipher;