import acl from './acl';
import SetPermission from './setPermission';
import { validateArgumentType } from './utils';

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

const check = new Check();

export { check };
