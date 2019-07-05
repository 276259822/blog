### 深拷贝实现

> WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。

```javascript
function deepClone(obj, hash = new WeakMap()) {
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  if (obj === null || typeof obj !== 'object') {
    // 如果不是复杂类型(function除外)，直接返回
    return obj
  }
  if (hash.has(obj)) {
    return hash.get(obj)
  }
  let t = new obj.constructor()
  hash.set(obj, t)
  for (let key in obj) {
    // 是否是自身属性
    if (obj.hasOwnProperty(key)) {
      t[key] = deepClone(obj[key], hash)
    }
  }
  return t
}
```
