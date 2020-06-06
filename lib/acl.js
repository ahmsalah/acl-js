"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.check = exports.an = exports.a = exports["default"] = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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

var Check = /*#__PURE__*/function (_SetPermission) {
  _inherits(Check, _SetPermission);

  var _super = _createSuper(Check);

  function Check() {
    _classCallCheck(this, Check);

    return _super.apply(this, arguments);
  }

  _createClass(Check, [{
    key: "if",
    value: function _if(role) {
      _get(_getPrototypeOf(Check.prototype), "a", this).call(this, role);

      return this;
    }
  }, {
    key: "from",
    value: function from(endpoint) {
      this._endpoint = endpoint;
      var permissionRef = acl._roles[this._role][this._http_verb][0] || false;

      if (endpoint.split('/').filter(function (val) {
        return val;
      }).length <= 1) {
        return permissionRef.endpoint === endpoint;
      }

      return this;
    }
  }, {
    key: "to",
    value: function to(endpoint) {
      return this.from(endpoint);
    }
  }]);

  return Check;
}(SetPermission);

var a = function a(arg) {
  return new SetPermission().a(arg);
};

exports.an = exports.a = a;
var check = new Check();
exports.check = check;
var _default = acl;
exports["default"] = _default;