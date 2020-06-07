"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateArgumentType = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * @author Ahmed Salah <aemdsalah@gmail.com>
 * @description This function is used to validate function/method argument types.
 * @example validateArgumentType(params, 'object', doSomething). // where params is an object
 * @param argument: argument supplied to the function.
 * @param expectedType: the expected type that the argument type will be evaluated against
 * @param methodName: the name of the function/method.
 */
var validateArgumentType = function validateArgumentType(argument, expectedType, methodName) {
  if (_typeof(argument) !== expectedType) throw new TypeError("Invalid argument \"".concat(argument, "\" of type \"").concat(_typeof(argument), "\" supplied to \"").concat(methodName, "\", expected \"").concat(expectedType, "\"."));
  return;
};

exports.validateArgumentType = validateArgumentType;