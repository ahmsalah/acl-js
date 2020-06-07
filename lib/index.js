"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _acl = _interopRequireWildcard(require("./acl"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_acl["default"].createRole('admin');

_acl["default"].createRole('user');

_acl["default"].createRole('guest');

(0, _acl.a)('admin').can('get').from('/articles');
(0, _acl.an)('admin').can('get').from('/articles');
(0, _acl.an)('admin').can('get').from('/users');
(0, _acl.a)('guest').can('post').to('/users');
(0, _acl.a)('user').can('post').to('/users/:userId/articles').when(function (params, user) {
  return user.id === params.userId;
});
console.log(_acl.check["if"]('admin').can('get').from('/articles'));
console.log(_acl.check["if"]('admin').can('get').from('/users'));
console.log(_acl.check["if"]('user').can('post').to('/articles'));
console.log(_acl.check["if"]('user').can('post').to('/users/10/articles').when({
  id: 10
}));