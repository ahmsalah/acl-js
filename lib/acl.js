"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.an = exports.a = exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Data store Structure
 
 const roles = {
   admin: {
     get: [
       { endpoint: '/users', condition: (params, user) => user.id === params.userId },
       { endpoint: '/articles' },
     ],
     post: [{ endpoint: '/users' }, { endpoint: '/articles' }],
   },
   guest: {
     get: [{ endpoint: '/users' }, { endpoint: '/articles' }],
   },
 };
 */
var acl = /*#__PURE__*/function () {
  function acl() {
    _classCallCheck(this, acl);
  }

  _createClass(acl, null, [{
    key: "createRole",
    value: function createRole(role) {
      console.log("Adding ".concat(role, " to Roles"));
      this._roles = _objectSpread(_objectSpread({}, this._roles), {}, _defineProperty({}, role, {}));
      console.log(this._roles);
    }
  }]);

  return acl;
}();

_defineProperty(acl, "_http_verbs", ['get', 'post', 'delete', 'patch', 'put']);

_defineProperty(acl, "_roles", {});

var SetPermission = /*#__PURE__*/function () {
  function SetPermission() {
    _classCallCheck(this, SetPermission);
  }

  _createClass(SetPermission, [{
    key: "a",
    value: function a(role) {
      // check if the role was created, if not throw an error
      if (!acl._roles[role]) throw new Error("Role ".concat(role, " does not exist! create it using createRole"));
      this._role = role;
      return this;
    }
  }, {
    key: "can",
    value: function can(http_verb) {
      // check if the argument is a supported http verb
      if (!acl._http_verbs.includes(http_verb)) throw new Error("Argument passed to can() must be a valid http verb");
      this._http_verb = http_verb.toLowerCase();
      return this;
    }
  }, {
    key: "from",
    value: function from(endpoint) {
      this._endpoint = endpoint;
      var endpointsRef = acl._roles[this._role][this._http_verb]; // override existing rules

      var existingEndpoints = (endpointsRef === null || endpointsRef === void 0 ? void 0 : endpointsRef.filter(function (item) {
        return item.endpoint !== endpoint;
      })) || [];
      acl._roles[this._role][this._http_verb] = [].concat(_toConsumableArray(existingEndpoints), [{
        endpoint: endpoint
      }]);
      console.log(acl._roles);
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
      return this;
    }
  }]);

  return SetPermission;
}();

var a = function a(arg) {
  return new SetPermission().a(arg);
};

exports.an = exports.a = a;
var _default = acl;
exports["default"] = _default;