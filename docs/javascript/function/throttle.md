### 节流函数

#### 节流函数的作用

节流函数的作用是规定一个单位时间，在这个单位时间内最多只能触发一次函数执行，如果这个单位时间内多次触发函数，只能有一次生效。

#### 节流函数实现

```javascript
function throttle(func, wait, options = {}) {
  let timeout, context, args, result
  let previous = 0
  let later = function () {
    previous = options.leading === false ? 0 : (Date.now() || new Date().getTime())
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  let throttled = function () {
    let now = Date.now() || new Date().getTime
    if (!previous && options.leading === false) previous = now
    let remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }

  throttled.cancel = function () {
    clearTimeout(timeout)
    previous = 0
    timeout = context = args = null
  }

  return throttled
}
```

> 禁用第一次首先执行，传递```{leading: false}```；想禁用最后一次执行，传递```{trailing: false}```

#### 节流的应用场景

1. 按钮点击事件
2. 拖拽事件
3. onScoll
4. 计算鼠标移动的距离(mousemove)
