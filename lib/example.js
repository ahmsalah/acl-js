"use strict";

var _acl = _interopRequireDefault(require("./acl"));

var _setPermission = require("./setPermission");

var _checkPermission = require("./checkPermission");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Run: npm start
 * Then uncomment the import of this file from index.js
 */
// create different roles
_acl["default"].createRole('admin');

_acl["default"].createRole('user');

_acl["default"].createRole('guest'); // * note: when adding a duplicate rule, only the last one will be added


(0, _setPermission.an)('admin').can('get').from('/articles');
(0, _setPermission.an)('admin').can('get').from('/articles');
(0, _setPermission.an)('admin').can('post').to('/users');
(0, _setPermission.an)('admin').can('get').from('/users');
(0, _setPermission.a)('guest').can('get').from('/articles'); // * note this will be overridden

(0, _setPermission.a)('user').can('post').to('/articles'); // * by this

(0, _setPermission.a)('user').can('post').to('/users/:userId/articles').when(function (params, user) {
  return user.id === params.userId;
});
console.log({
  '1. can an admin list all users?': _checkPermission.check["if"]('admin').can('get').from('/users'),
  '2. can an admin list all articles?': _checkPermission.check["if"]('admin').can('get').from('/articles'),
  '3. can an admin create users?': _checkPermission.check["if"]('admin').can('post').to('/users'),
  '4. can a guest create users?': _checkPermission.check["if"]('guest').can('post').to('/users'),
  '5. can a guest list all articles?': _checkPermission.check["if"]('guest').can('get').from('/articles'),
  '6. can a user post articles?': _checkPermission.check["if"]('user').can('post').to('/articles'),
  '7. can a user post only to his articles?': _checkPermission.check["if"]('user').can('post').to('/users/10/articles').when({
    id: 10
  })
});