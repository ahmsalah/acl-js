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

import { validateArgumentType } from './utils';

class acl {
  static _http_verbs = ['get', 'post', 'delete', 'patch', 'put'];
  static _roles = {};

  static createRole(role) {
    validateArgumentType(role, 'string', this.createRole.name);

    this._roles = { ...this._roles, [role]: {} };
  }
}

class SetPermission {
  a(role) {
    // check if the role was created, if not throw an error
    if (!acl._roles[role])
      throw new TypeError(`Role "${role}" does not exist! create it using "createRole".`);

    this._role = role;
    return this;
  }

  can(http_verb) {
    this._http_verb = http_verb.toLowerCase();

    // check if the argument is a supported http verb
    if (!acl._http_verbs.includes(this._http_verb))
      throw new TypeError(`"${http_verb}" is not a supported http verb, please enter a valid one.`);

    return this;
  }

  from(endpoint) {
    validateArgumentType(endpoint, 'string', this.from.name);
    this._endpoint = endpoint;
    const endpointsRef = acl._roles[this._role][this._http_verb];
    // override existing rules
    const existingEndpoints = endpointsRef?.filter(item => item.endpoint !== endpoint) || [];
    acl._roles[this._role][this._http_verb] = [...existingEndpoints, { endpoint }];
    console.log(acl._roles);
    return this;
  }

  to(endpoint) {
    // to is an alias of from
    this.from(endpoint);
    return this;
  }

  when(condition) {
    validateArgumentType(condition, 'function', this.when.name);
    this._condition = condition;

    const newArr = acl._roles[this._role][this._http_verb].map(item =>
      item.endpoint === this._endpoint ? { ...item, condition } : item,
    );
    acl._roles[this._role][this._http_verb] = newArr;

    return this;
  }
}

class Check extends SetPermission {
  if(role) {
    super.a(role);
    return this;
  }

  from(endpoint) {
    validateArgumentType(endpoint, 'string', this.from.name);

    this._endpointArr = endpoint.split('/').filter(val => val);

    if (this._endpointArr.length <= 1) {
      return !!acl._roles[this._role]?.[this._http_verb]?.some(item => item.endpoint === endpoint);
    }

    return this;
  }

  to(endpoint) {
    return this.from(endpoint);
  }

  when(params) {
    validateArgumentType(params, 'object', this.when.name);

    const permission = acl._roles[this._role][this._http_verb].filter(
      item => item.endpoint.split('/').filter(val => val)[0] === this._endpointArr[0],
    )[0];

    this.paramsKey = permission.endpoint
      .split('/')
      .filter(item => item.includes(':'))[0]
      .replace(':', '');

    // check if the type of the argument passed to when is a number
    const isNumber = typeof Object.values(params)[0] === 'number';

    this.params = {};
    this.params[this.paramsKey] = isNumber
      ? parseInt(this._endpointArr[1], 10)
      : this._endpointArr[1];

    return permission.condition(this.params, params);
  }
}

const a = arg => new SetPermission().a(arg);
const check = new Check();

export default acl;
export { a, a as an, check };
