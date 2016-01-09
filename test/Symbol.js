import {assert} from 'chai';

describe("test Symbol", function () {
  it("Symbol is a new data type", function () {
    assert.typeOf(Symbol('my symbol'), 'symbol');
  });
  it('should not equal anything', function () {
    assert.isFalse(Symbol("hello") == Symbol("hello"));
  });
  it('should share symbol value while using method `for`', function () {
    assert.equal(Symbol.for("anything"), Symbol.for("anything"));
  });
  describe("should support `for of` when [Symbol.iterator]() and next() implemented", function () {
    it('implemented by object literals', function () {
      const obj = {
        a: 1,
        b: 2,
        [Symbol.iterator]() {
          const self = this;
          let index = 0;
          return  {
            next() {
              if (index === 0) {
                index++;
                return {value: self.a, done: false};
              } else if (index === 1) {
                index++;
                return {value: self.b, done: false};
              }
              return {value: undefined, done: true};
            }
          };
        }
      };
      //挨个遍历
      let index = 0;
      for(let i of obj) {
        if (index === 0) {
          index++;
          assert.equal(i, obj.a);
        } else {
          assert.equal(i, obj.b);
        }
      }
      assert.typeOf(obj[Symbol.iterator]().next, "function");
    });

    var Iterator;
    before(function () {
      //应该实现两个接口：
      class Inner {
        constructor(start = 0, end = 10) {
          this._start = start;
          this._end = end;
          this.index = this._start;
        }
        // next接口，用来遍历
        next() {
          if (this.index <= this._end) {
            return {value: (this.index++), done: false};
          }
          return {value: undefined, done: true};
        }
        // 返回iterator实例
        [Symbol.iterator]() { return new Inner(this._start, this._end); }
      }
      Iterator = Inner;
    });
    describe('#implemented by class', function () {
      it("should pass by `for of`", function () {
        //定义一个Iterator
        var iterator = new Iterator(1, 3);
        const firstResult = [];
        const result = [1, 2, 3];
        for (let x of iterator) {
          firstResult.push(x);
        }
        assert.deepEqual(firstResult, result);
        // 若干次调用结果应该一样
        const secondResult = [];
        for (let x of iterator) {
          secondResult.push(x);
        }
        assert.deepEqual(secondResult, result);
      });
      // 采用iterator遍历的方式
      it("should pass by `next` too", function () {
        var iterator = new Iterator(1, 3)[Symbol.iterator]();
        assert.equal(iterator.next().value, 1);
        assert.equal(iterator.next().value, 2);
        assert.equal(iterator.next().value, 3);
        assert.equal(iterator.next().value, undefined);
        assert.equal(iterator.next().value, undefined);
      });
    });
  });
});
