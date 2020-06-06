import acl, { a, an, check } from './acl';

acl.createRole('admin');
acl.createRole('user');
acl.createRole('guest');

a('admin').can('get').from('/articles');
an('admin').can('get').from('/articles');
an('admin').can('get').from('/users');
a('guest').can('post').to('/users');

console.log(check.if('admin').can('get').from('/articles'));
console.log(check.if('admin').can('get').from('/users'));
