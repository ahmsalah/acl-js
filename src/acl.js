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

export default class acl {
  static _http_verbs = ['get', 'post', 'delete', 'patch', 'put'];
  static _roles = {};

  static createRole(role) {
    console.log(`Adding ${role} to Roles`);
    this._roles = { ...this._roles, [role]: {} };
    console.log(this._roles);
  }
}
