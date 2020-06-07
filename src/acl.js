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

export default acl;
