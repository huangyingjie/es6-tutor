import {assert} from "chai";
// 用来调用对象的指定函数，如同java的反射
describe("Reflect API", function () {
  it("ownKeys", function () {
    const O = {a: 1};
    Object.defineProperty(O, 'b', {value: 2});
    assert.deepEqual(Reflect.ownKeys(O), ['a', 'b']);
    assert.equal(Reflect.get(O, 'a'), 1);
  });
  it('apply, like Function.prototype.apply', function () {
    assert.equal(Reflect.apply(Math.floor, undefined, [2.6]), 2);
    assert.equal(Reflect.apply("".charAt, "ponies", [3]), 'i');
  });
  it('construct', function () {
    class A {
      props() {
        return "a";
      }
    }
    assert.equal(Reflect.construct(A).props(), 'a');
    const d = Reflect.construct(Date, [1776, 6, 4]);
    assert.isTrue(d instanceof Date);
    //用了harmony，node环境不兼容
    //assert.equal(d.getFullYear(), 1776);
  });
  it('defineProperty, like Object.defineProperty', function () {
    const obj = {};
    const result = Reflect.defineProperty(obj, 'a', {value: 2});
    assert.equal(obj.a, 2);
    assert.isTrue(result);
  });
  it('deleteProperty', function () {
    //object
    const obj = {x: 1, y: 2};
    Reflect.deleteProperty(obj, 'x');
    assert.equal(obj.x, undefined);
    assert.isFalse(obj.hasOwnProperty('x'));

    //array
    const array = [1, 2, 3];
    Reflect.deleteProperty(array, 1);
    assert.equal(array[0], 1);
    assert.equal(array[1], undefined);
    assert.equal(array[2], 3);
    // cannot delete unconfigurable object
    const a = Object.freeze({foo: 1})
    assert.isFalse(Reflect.deleteProperty(a, 'foo'));
    assert.equal(a.foo, 1);
  });
  it("enumerate", function () {
    const object = {x: 1, y: 2};
    const result = Reflect.enumerate(object);
    // result is an iterator
    assert.typeOf(result.next, 'function');
    assert.equal(result.next().value, 'x');
    assert.equal(result.next().value, 'y');
  });
  it("get", function () {
    const obj = {x: 2};
    assert.equal(Reflect.get(obj, 'x'), 2);
    const array = ['a', 'b'];
    assert.equal(Reflect.get(array, 0), 'a');
  });
  it('has', function () {
    assert.isTrue(Reflect.has({}, 'toString'));
    const obj = {x: 1};
    assert.equal(Reflect.has(obj, 'x'), 'x' in obj);
  });
  it('isExtensible && preventExtensions', function () {
    assert.isTrue(Reflect.isExtensible({}));
    const obj = {};
    Reflect.preventExtensions(obj);
    assert.isFalse(Reflect.isExtensible(obj));
    const frozen = Object.freeze({});
    assert.isFalse(Reflect.isExtensible(frozen));
  });
});
