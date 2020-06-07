import acl from './acl';
import { a, an } from './setPermission';
import { check } from './checkPermission';

export default acl;
export { a, an, check };

// create different roles
acl.createRole('admin');
acl.createRole('user');
acl.createRole('guest');

// when adding a duplicate rule, only the last one will be added
an('admin').can('get').from('/articles');
an('admin').can('get').from('/articles');

an('admin').can('post').to('/users');
an('admin').can('get').from('/users');
a('guest').can('get').from('/articles');
// this will be overridden
a('user').can('post').to('/articles');
// by this
a('user')
  .can('post')
  .to('/users/:userId/articles')
  .when((params, user) => user.id === params.userId);

console.log({
  '1. can an admin list all users?': check.if('admin').can('get').from('/users'),
  '2. can an admin list all articles?': check.if('admin').can('get').from('/articles'),
  '3. can an admin create users?': check.if('admin').can('post').to('/users'),
  '4. can a guest create users?': check.if('guest').can('post').to('/users'),
  '5. can a guest list all articles?': check.if('guest').can('get').from('/articles'),
  '6. can a user post articles?': check.if('user').can('post').to('/articles'),
  '7. can a user post only to his articles?': check
    .if('user')
    .can('post')
    .to('/users/10/articles')
    .when({ id: 10 }),
});
console.log(acl._roles);
