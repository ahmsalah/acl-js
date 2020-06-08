# acl-js

A lightweight access control lists (ACL) javascript implementation for privileges management.

## Installation

Using **npm**

```bash
npm install @ahmsalah/acl-js
```

## Usage

Here is a quick example to get you started:

```js
import acl, { a, an, check } from '@ahmsalah/acl-js';

// create different roles
acl.createRole('admin');
acl.createRole('user');

// set permissions
an('admin').can('post').to('/users');
a('user').can('get').from('/articles');

// check permissions
console.log(check.if('admin').can('post').to('/users')); // true
console.log(check.if('user').can('post').to('/users')); // false
```

### Create a new role

```js
import { a, an } from '@ahmsalah/acl-js';

an('admin').can('post').to('/users');
a('user').can('get').from('/articles');
```

### Set permission

`a` or `an` accepts a role, that was previously defined by `createRole`.

`can` accepts one of the following http verbs: (get, post, delete, patch, put).

`from` or `to` accepts an endpoint string.

Please note that `a` is just an alias of `an` while `to` is an alias of `from`; so using either one of them doesn't affect the logic in any way.

```js
a('user').can('get').from('/articles');
a('user').can('post').to('/articles');
```

You can optionally chain an additional method `when`, to set a permission with a specific condition.

```js
// in the example bellow, a user can add an article when it's his data.
a('user')
  .can('post')
  .to('/users/:userId/articles')
  .when((params, user) => user.id === params.userId);

// another example: a user can add a comment to a specific article
a('user')
  .can('post')
  .to('/articles/:articleId/articles')
  .when((params, article) => article.id === params.articleId);
```

### Query permissions

You can check permissions using `check.if(anyRole)`

```js
check.if('admin').can('post').to('/users'); // returns either true or false;
```

query permissions that has a specific condition:

```js
a('user')
  .can('post')
  .to('/users/:userId/articles')
  .when((params, user) => user.id === params.userId);

// then to query this permission
check.if('user').can('post').to('/users/10/articles').when({ id: 10 }); // true

check.if('user').can('post').to('/users/10/articles').when({ id: 24 }); // false
```
