### 柯里化函数

### 简介

函数柯里化是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。


```javascript
const curry = (fn, ...args) => 
  args.length < fun.length
    ? (...arguments) => curry(fn, ...args, ...arguments)
    : fn(...args)
```

```javascript
function sumFn(a, b, c) {
  return a + b + c
}
let sum = curry(sumFn)
console.log(sum(2)(3)(5)) // 10
console.log(sum(2)(3, 5)) // 10
console.log(sum(2, 3)(5)) // 10
console.log(sum(2, 3, 5)) // 10
```
