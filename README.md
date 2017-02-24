# js-enums, Enum in javascript!


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]


[npm-image]: https://img.shields.io/npm/v/js-enums.svg?style=flat-square
[npm-url]: https://npmjs.org/package/js-enums
[travis-image]: https://img.shields.io/travis/forthedamn/js-enums.svg?style=flat-square
[travis-url]: https://travis-ci.org/forthedamn/js-enums
[codecov-image]: https://codecov.io/gh/forthedamn/js-enums/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/forthedamn/js-enums
[download-image]: https://img.shields.io/npm/dt/js-enums.svg
[download-url]: https://npmjs.org/package/js-enums


> npm install js-enums

### simple to use

```
const enum = require('js-enums');

var status = enum([
  {
    name: 'CLOSED',
    ortherInfo: 'status close'
  },
  {
    name: 'OPENED',
    ortherInfo: 'status open'
  }
]);
 
// or declare in this way: 
// var status = enum(['OPENED', 'CLOSED']);


status.OPENED; // { name: 'OPENED', order: 0, ortherInfo: 'status open' }

status.getByOrder(1); // { name: 'OPENED', order: 0, ortherInfo: 'status open'}

status.OPENED.eql('OPENED') // true

```

### APIs

- eql

compare with enum

- getByOrder

return the enum by order


### some tips

- init order

order only can init in first position of the array, and order is increased by step 1.

```
var status = enum([
  {
    name: 'CLOSED',
    order: 2
  },
  {
    name: 'OPENED',
  }
]);


status.OPENED.order; // 3
```
- custom eql

```
var status = enum(['OPENED', 'CLOSED']);

status.OPENED.eql('OPENED') // true, eql by name, param must be string

status.OPENED.eql(0) // true, eql by order, param should not be NaN

status.OPENED.eql({name: 'OPENED'}) // true

status.OPENED.eql({name: 'OPENED', order: 2}) // false

status.OPENED.eql({name: 'OPENED', order: 1, ortherInfo: 'status open'}) // true
```

