class acl {
  static _http_verbs = ['get', 'post', 'delete', 'patch', 'put'];
  static _roles = {
    // admin: {
    //   get: [{ endpoint: '/users', rule: '' }, { endpoint: '/articles' }],
    //   post: [{ endpoint: '/users' }, { endpoint: '/articles' }],
    // },
    // guest: {
    //   get: [{ endpoint: '/users' }, { endpoint: '/articles' }],
    // },
  };

  static createRole(role) {
    console.log(`Adding ${role} to Roles`);
    this._roles = { ...this._roles, [role]: {} };
    console.log(this._roles);
  }
}

acl.createRole('admin');
acl.createRole('user');
