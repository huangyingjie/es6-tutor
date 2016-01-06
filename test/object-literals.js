import {assert} from "chai";
describe("object literals", function () {
  it("shortHand", function () {
    const someKey = "someKey";
    const literal = {
      someKey,
      toString() {
        return super.toString().toUpperCase();
      }
    };
    assert.equal(literal.someKey, someKey);
    assert.typeOf(literal.toString, "function");
  });
  it("extends by __proto__", function () {
    const parent = {
      name: "green",
      toString() {
        return this.name;
      }
    };
    const literal = {
      __proto__: parent,
      toString() {
        return super.toString().toUpperCase();
      }
    };
    assert.equal(literal.toString(), "GREEN");
  });
  it("Computed (dynamic) property names", function () {
    const literal = {
      ["my" + (() => "Name")()]: "Green"
    };
    assert.equal(literal.myName, "Green");
  });
});
