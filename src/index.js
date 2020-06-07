import acl, { a, an, check } from './acl';

acl.createRole('admin');
acl.createRole('user');
acl.createRole('guest');

a('admin').can('get').from('/articles');
an('admin').can('get').from('/articles');
an('admin').can('get').from('/users');
a('guest').can('post').to('/users');
a('user')
  .can('post')
  .to('/users/:userId/articles')
  .when((params, user) => user.id === params.userId);

console.log(check.if('admin').can('get').from('/articles'));
console.log(check.if('admin').can('get').from('/users'));
