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
class acl {
  static _http_verbs = ['get', 'post', 'delete', 'patch', 'put'];
  static _roles = {};

  static createRole(role) {
    console.log(`Adding ${role} to Roles`);
    this._roles = { ...this._roles, [role]: {} };
    console.log(this._roles);
  }
}

class SetPermission {
  a(role) {
    // check if the role was created, if not throw an error
    if (!acl._roles[role])
      throw new Error(`Role ${role} does not exist! create it using createRole`);

    this._role = role;
    return this;
  }

  can(http_verb) {
    // check if the argument is a supported http verb
    if (!acl._http_verbs.includes(http_verb))
      throw new Error(`Argument passed to can() must be a valid http verb`);

    this._http_verb = http_verb.toLowerCase();
    return this;
  }

  from(endpoint) {
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
    return this;
  }
}

class Check extends SetPermission {
  if(role) {
    super.a(role);
    return this;
  }

  from(endpoint) {
    this._endpoint = endpoint;
    const permissionRef = acl._roles[this._role][this._http_verb][0] || false;
    if (endpoint.split('/').filter(val => val).length <= 1) {
      return permissionRef.endpoint === endpoint;
    }
    return this;
  }

  to(endpoint) {
    return this.from(endpoint);
  }
}

const a = arg => new SetPermission().a(arg);
const check = new Check();

export default acl;
export { a, a as an, check };
