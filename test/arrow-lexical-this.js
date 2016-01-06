import {assert} from "chai";
describe("arrow-lexical-this", function () {
  it("behave like common function", function () {
    assert.equal([1].map(i => i + 1), 2);
  });
  it("test lexical-this", function () {
    const _this = this;
    (() => assert.equal(this, _this, "is equal"))();
  });
});
