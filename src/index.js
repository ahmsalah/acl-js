import acl, { a, an } from './acl';

acl.createRole('admin');
acl.createRole('user');
acl.createRole('guest');

a('admin').can('get').from('/articles');
an('admin').can('get').from('/articles');
an('admin').can('get').from('/users');
a('guest').can('post').to('/users');
