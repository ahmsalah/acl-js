/**
 * @author Ahmed Salah <aemdsalah@gmail.com>
 * @description This function is used to validate function/method argument types.
 * @example validateArgumentType(params, 'object', doSomething). // where params is an object
 * @param argument: argument supplied to the function.
 * @param expectedType: the expected type that the argument type will be evaluated against
 * @param methodName: the name of the function/method.
 */
export const validateArgumentType = (argument, expectedType, methodName) => {
  if (typeof argument !== expectedType)
    throw new TypeError(
      `Invalid argument "${argument}" of type "${typeof argument}" supplied to "${methodName}", expected "${expectedType}".`,
    );

  return;
};
