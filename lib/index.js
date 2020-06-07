"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "a", {
  enumerable: true,
  get: function get() {
    return _setPermission.a;
  }
});
Object.defineProperty(exports, "an", {
  enumerable: true,
  get: function get() {
    return _setPermission.an;
  }
});
Object.defineProperty(exports, "check", {
  enumerable: true,
  get: function get() {
    return _checkPermission.check;
  }
});
exports["default"] = void 0;

var _acl = _interopRequireDefault(require("./acl"));

var _setPermission = require("./setPermission");

var _checkPermission = require("./checkPermission");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _acl["default"];
/**
 * Run: npm start
 * then uncomment the following import
 */
// import example from './example';

exports["default"] = _default;