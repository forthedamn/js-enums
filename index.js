'use strict'

const enums = (items) => {
  
  if (!Array.isArray(items)) {
    throw new Error('[js-enums] param must be Array!');
  }

  if (items.length <= 0) {
    throw new Error('[js-enums] param length must greater than 0!');
  }

  return new Enum(items);
}

class Enum {
  constructor(items) {
    // cache the order
    let _order = 0;

    items.map((item, index) => {

      // init enum item
      const _enumItem = {
        eql: this._eql,
      }
      
      if (typeof item === 'undefined' || item === null) {
        throw new Error('[js-enums] enum item cant be undefined or null');
      }

      /**
       * string param will be completed auto
       * 
       * when use enum in this way:
       *   enum(['OPENED', 'CLOSED'])
       */
      if (typeof item === 'string') {

        if (!isNaN(item)) {
          console.warn('[js-enums] key may not set as number');
        }

        Object.defineProperties(_enumItem, {
          'name': {
            value: item,
            writable: false,
            enumerable: true,
          },
          'order': {
            value: _order,
            writable: false,
            enumerable: true,
          }
        });
        this[item] = _enumItem;
        _order++;
        return;
      }

      /**
       * when use enum in this way:
       *   enum([{name: 'OPENED', order: 1}, {name: 'CLOSED'}])
       */
      if (typeof item === 'object') {

        if (typeof item.name === 'undefined') {
          throw new Error('[js-enums] enum item need a name');
        }

        if (!isNaN(item.name)) {
          console.warn('[js-enums] key may not set as number');
        }

        if (typeof item.order !== 'undefined' && isNaN(parseInt(item.order))) {
          throw new Error('[js-enums] enum item order must be number');
        }

        // can init _order when deal with first item
        if (index === 0) _order = item.order || _order;

        // init enumItem properties
        const props = {
          order: {
            value: _order,
            writable: false,
            enumerable: true,
          }
        };
        Object.keys(item).map(key => {
          if (key !== 'order') {
            props[key] = {
              value: item[key],
              writable: false,
              enumerable: true,
            }
          }
        });

        Object.defineProperties(_enumItem, props);
        this[item.name] = _enumItem;
        _order++;
        return;
      }

      // support string object until now
      throw new Error('[js-enums] invalid type');

    })
  }

  getByOrder(order) {
    const key = Object.keys(this).filter(key => {
      return this[key].order === parseInt(order);
    })[0];
    return this[key];
  }

  /**
   * pravite method
   * 
   * used by enum item
   * 
   * @param {any} param 
   * @returns 
   * 
   * @memberOf Enum
   */
  _eql(param) {

    if (typeof param === 'number') {
      return this.order === param;
    }

    if (typeof param === 'object') {
      return Object.keys(param).every(key => this[key] === param[key]);
    }

    if (typeof param === 'string') {
      return this.name === param;
    }

  }
}

module.exports = enums;
