# acl-js

Access control lists javascript library

## Installation

Using **npm**

```bash
npm install @ahmsalah/acl-js
```

## Quick Usage example

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
