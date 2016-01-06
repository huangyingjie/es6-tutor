import {assert} from "chai";
describe("Reflect API", function () {
  it("Reflect API", function () {
    var O = {a: 1};
    Object.defineProperty(O, 'b', {value: 2});
    O[Symbol('c')] = 3;
    assert.equal(O.a, 1);
    assert.equal(typeof Symbol('c'), "symbol");
  });
});

