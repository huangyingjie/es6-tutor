import {assert} from "chai";
describe("destructuring", function () {
  it("array", function () {
    const [a, b, ...c] = [1, 2, 3, 4];
    assert.equal(a, 1);
    assert.equal(b, 2);
    assert.deepEqual(c, [3, 4]);
    //default value
    const [x = 1] = [];
    assert.equal(x, 1);
  });
  it("object", function () {
    const {a, b, c: {d, e = 2}} = {a: 1, b: 2, c: {d: 1}};
    assert.equal(a, 1);
    assert.equal(b, 2);
    assert.equal(d, 1);
    // e is the default value
    assert.equal(e, 2);
  });
  it("function params", function () {
    // destructuring && default value
    (function ({a = 1}) {
      assert.equal(a, 1);
    })({});
    // 非匿名
    function g({a = 1}) {
      assert.equal(a, 2);
    }
    g({a: 2});
  });
});
