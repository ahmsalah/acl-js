"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.check = void 0;

var _acl = _interopRequireDefault(require("./acl"));

var _setPermission = _interopRequireDefault(require("./setPermission"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
      (0, _utils.validateArgumentType)(endpoint, 'string', this.from.name);
      this._endpointArr = endpoint.split('/').filter(function (val) {
        return val;
      });

      if (this._endpointArr.length <= 1) {
        var _acl$_roles$this$_rol, _acl$_roles$this$_rol2;

        return !!((_acl$_roles$this$_rol = _acl["default"]._roles[this._role]) === null || _acl$_roles$this$_rol === void 0 ? void 0 : (_acl$_roles$this$_rol2 = _acl$_roles$this$_rol[this._http_verb]) === null || _acl$_roles$this$_rol2 === void 0 ? void 0 : _acl$_roles$this$_rol2.some(function (item) {
          return item.endpoint === endpoint;
        }));
      }

      return this;
    }
  }, {
    key: "to",
    value: function to(endpoint) {
      return this.from(endpoint);
    }
  }, {
    key: "when",
    value: function when(params) {
      var _this = this;

      (0, _utils.validateArgumentType)(params, 'object', this.when.name);

      var permission = _acl["default"]._roles[this._role][this._http_verb].filter(function (item) {
        return item.endpoint.split('/').filter(function (val) {
          return val;
        })[0] === _this._endpointArr[0];
      })[0];

      this.paramsKey = permission.endpoint.split('/').filter(function (item) {
        return item.includes(':');
      })[0].replace(':', ''); // check if the type of the argument passed to when is a number

      var isNumber = typeof Object.values(params)[0] === 'number';
      this.params = {};
      this.params[this.paramsKey] = isNumber ? parseInt(this._endpointArr[1], 10) : this._endpointArr[1];
      return permission.condition(this.params, params);
    }
  }]);

  return Check;
}(_setPermission["default"]);

var check = new Check();
exports.check = check;