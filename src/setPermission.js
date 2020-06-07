import acl from './acl';
import { validateArgumentType } from './utils';

export default class SetPermission {
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
    const endpointArr = endpoint.split('/').filter(val => val);

    /**
     * - override existing rules:
     * if a user sets a rule like so: a('user').can('post').to('/articles')
     * then enters a another rule with a condition e.x. a('user').can('post').to('/users/:userId/articles').when(....)
     * the first rule get overridden by the latter.
     */
    const existingEndpoints =
      acl._roles[this._role][this._http_verb]?.filter(item => {
        const currEndpointArr = item.endpoint.split('/').filter(val => val);
        return endpointArr.length <= 1
          ? currEndpointArr[0] !== endpointArr[0]
          : currEndpointArr[0] !== endpointArr[2];
      }) || [];

    acl._roles[this._role][this._http_verb] = [...existingEndpoints, { endpoint }];

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

const a = arg => new SetPermission().a(arg);

export { a, a as an };
