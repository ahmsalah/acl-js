"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.an = exports.a = exports["default"] = void 0;

var _acl = _interopRequireDefault(require("./acl"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SetPermission = /*#__PURE__*/function () {
  function SetPermission() {
    _classCallCheck(this, SetPermission);
  }

  _createClass(SetPermission, [{
    key: "a",
    value: function a(role) {
      // check if the role was created, if not throw an error
      if (!_acl["default"]._roles[role]) throw new TypeError("Role \"".concat(role, "\" does not exist! create it using \"createRole\"."));
      this._role = role;
      return this;
    }
  }, {
    key: "can",
    value: function can(http_verb) {
      this._http_verb = http_verb.toLowerCase(); // check if the argument is a supported http verb

      if (!_acl["default"]._http_verbs.includes(this._http_verb)) throw new TypeError("\"".concat(http_verb, "\" is not a supported http verb, please enter a valid one."));
      return this;
    }
  }, {
    key: "from",
    value: function from(endpoint) {
      var _acl$_roles$this$_rol;

      (0, _utils.validateArgumentType)(endpoint, 'string', this.from.name);
      this._endpoint = endpoint;
      var endpointArr = endpoint.split('/').filter(function (val) {
        return val;
      });
      /**
       * - override existing rules:
       * if a user sets a rule like so: a('user').can('post').to('/articles')
       * then enters a another rule with a condition e.x. a('user').can('post').to('/users/:userId/articles').when(....)
       * the first rule get overridden by the latter.
       */

      var existingEndpoints = ((_acl$_roles$this$_rol = _acl["default"]._roles[this._role][this._http_verb]) === null || _acl$_roles$this$_rol === void 0 ? void 0 : _acl$_roles$this$_rol.filter(function (item) {
        var currEndpointArr = item.endpoint.split('/').filter(function (val) {
          return val;
        });
        return endpointArr.length <= 1 ? currEndpointArr[0] !== endpointArr[0] : currEndpointArr[0] !== endpointArr[2];
      })) || [];
      _acl["default"]._roles[this._role][this._http_verb] = [].concat(_toConsumableArray(existingEndpoints), [{
        endpoint: endpoint
      }]);
      return this;
    }
  }, {
    key: "to",
    value: function to(endpoint) {
      // to is an alias of from
      this.from(endpoint);
      return this;
    }
  }, {
    key: "when",
    value: function when(condition) {
      var _this = this;

      (0, _utils.validateArgumentType)(condition, 'function', this.when.name);
      this._condition = condition;

      var newArr = _acl["default"]._roles[this._role][this._http_verb].map(function (item) {
        return item.endpoint === _this._endpoint ? _objectSpread(_objectSpread({}, item), {}, {
          condition: condition
        }) : item;
      });

      _acl["default"]._roles[this._role][this._http_verb] = newArr;
      return this;
    }
  }]);

  return SetPermission;
}();

exports["default"] = SetPermission;

var a = function a(arg) {
  return new SetPermission().a(arg);
};

exports.an = exports.a = a;