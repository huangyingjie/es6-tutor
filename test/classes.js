import {assert} from "chai";
describe("classes feature", function () {
  it("static method", function () {
    class A {
      static getClassName() {
        return "A";
      }
    }
    assert.equal("A", A.getClassName());
  });
  it("constructor", function () {
    class A {
      constructor(a, b) {
        this._a = a;
        this._b = b;
      }
    }
    const a = new A(1, 2);
    assert.equal(a._a, 1);
    assert.equal(a._b, 2);
  });
  it("extends", function () {
    class Parent {
      constructor(name) {
        this._name = name;
      }
      get name() {
        return this._name;
      }
    }
    class A extends Parent{
      constructor(name, age) {
        super(name);
        this._age = age;
      }
      get age() {
        return this._age;
      }
    }
    const a = new A("Green", 16);
    assert.equal(a.name, "Green");
    assert.equal(a.age, 16);
  });
});

