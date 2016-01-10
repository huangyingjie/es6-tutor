import {assert} from "chai";
import "harmony-reflect";
describe("proxies", function () {
  it("simple proxy", function () {
    const obj = new Proxy({}, {
      get: function (target, key, receiver) {
        return Reflect.get(target, key, receiver);
      },
      set: function (target, key, value, receiver) {
        return Reflect.set(target, key, value, receiver);
      }
    });
    obj.x = 1;
    assert.equal(obj.x, 1);
  });
});
