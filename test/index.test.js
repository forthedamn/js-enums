'use strict';

const assert = require('assert');

const enums = require('../index');

describe('js-enums', () => {

  describe('declare enums', () => {

    it('declare object with order', () => {
      const statusEnum = enums([{name: 'OPENED', order: 2, msg: 'has been opened'}, {name: 'CLOSED'}]);
      assert(statusEnum.OPENED.name === 'OPENED');
      assert(statusEnum.OPENED.order === 2);
      assert(statusEnum.OPENED.msg === 'has been opened');
      assert(statusEnum.CLOSED.order === 3);
    });

    it('declare object with no order', () => {
      const statusEnum = enums([{name: 'OPENED'}, {name: 'CLOSED'}]);
      assert(statusEnum.OPENED.name === 'OPENED');
      assert(statusEnum.OPENED.order === 0);
      assert(statusEnum.CLOSED.order === 1);
    });

    it('declare string', () => {
      const statusEnum = enums(['OPENED', 'CLOSED']);
      assert(statusEnum.OPENED.name === 'OPENED');
      assert(statusEnum.OPENED.order === 0);
      assert(statusEnum.CLOSED.order === 1);
    });

    it('invalid param', () => {
      assert.throws(()=> {
        const enum_1 = enums({});
      }, '[js-enums] param must be Array!');

      assert.throws(()=> {
        const enum_2 = enums([1,2]);
      }, '[js-enums] invalid type');

      assert.throws(()=> {
        const enum_3 = enums([]);
      }, '[js-enums] param length must greater than 0!');

      assert.throws(()=> {
        const enum_4 = enums([null]);
      }, '[js-enums] enum item cant be undefined or null');
    });
  })

  describe('enum eql', () => {
    let statusEnum;
    beforeEach(() => {
      statusEnum = enums([{name: 'OPENED'}, {name: 'CLOSED'}]);
    });

    it('eql with object', () => {
      assert.ok(statusEnum.OPENED.eql({name: 'OPENED'}));
      assert.ok(statusEnum.OPENED.eql({name: 'OPENED'}));
      assert.ok(statusEnum.OPENED.eql({order: 0}));
      assert.ok(statusEnum.OPENED.eql(0));
      assert.ifError(statusEnum.OPENED.eql({name: 'CLOSED'}));
      assert.ifError(statusEnum.OPENED.eql({name: 'OPENED', order: 1}));
    });

    it('eql with string', () => {
      assert.ok(statusEnum.OPENED.eql('OPENED'));
      assert.ifError(statusEnum.OPENED.eql('CLOSED'));
    });
  })

  describe('enum getByOrder', () => {
    let statusEnum;
    beforeEach(() => {
      statusEnum = enums([{name: 'OPENED'}, {name: 'CLOSED'}]);
    });

    it('get value', () =>{
      assert.ok(statusEnum.getByOrder(0).name === 'OPENED', '1');
      assert.ok(statusEnum.getByOrder(1).name !== 'OPENED', '2');
    });
  });
});
