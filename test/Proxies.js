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
  it("add arbitrary props to object through proxy", function () {
    function Tree() {
      return new Proxy({}, handler);
    }
    const handler = {
      get: function (target, key, receiver) {
        if (!(key in target)) {
          target[key] = Tree();  // 自动创建一个子树
        }
        return Reflect.get(target, key, receiver);
      }
    };
    const tree = Tree();
    tree.branch1.branch2.twig = "green";
    assert.equal(tree.branch1.branch2.twig, "green");
    tree.branch1.branch3.twig = "blue";
    assert.equal(tree.branch1.branch3.twig, "blue");
  });
});
