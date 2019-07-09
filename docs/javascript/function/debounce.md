### 防抖函数

#### 防抖函数的作用

防抖函数的作用就是控制函数在一定时间内的执行次数。防抖意味着N秒内函数只会被执行一次，如果N秒内再次被触发，则重新计算延迟时间。

#### 防抖函数实现
  1. 事件第一次触发时，```timeout```是```null```，调用```later()```，若```immediate```为```true```，那么立即调用```func.apply(this, params)```；如果```immediate```为```false```，那么过```wait``` 之后，调用```func.apply(this, params)```
  2. 事件第二次触发时，如果```timeout```已经重置为```null```(即```setTimeout```的倒计时结束)，那么流程与第一次触发时一样，若```timeout```不为```null```(即```setTimeout```的倒计时未结束)，那么清空定时器，重新开始计时。

  > ```immediate```为```true```时，表示函数在每个等待时延的开始被调用。```immediate```为```false``` 时，表示函数在每个等待时延的结束被调用。

```javascript
function debounce(func, wait, immediate = false) {
  let timeout, result
  const later = (context, args) => setTimeout(() => {
    timeout = null
    if (!immediate) {
      result = func.apply(context, args)
      context = args = null
    }
  }, wait)
  let debounced = function (...params) {
    if (!timeout) {
      timeout = later(this, params)
      if (immediate) {
        result = func.apply(this, params)
      }
    } else {
      clearTimeout(timeout)
      timeout = later(this, params)
    }
    return result
  }
  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }
  return debounced
}
```

#### 防抖的应用场景
  1. 搜索框输入查询，如果用户一直在输入中，没有必要不停地调用去请求服务端接口，等用户停止输入的时候，再调用，设置一个合适的时间间隔，有效减轻服务端压力。
  2. 表单验证
  3. 按钮提交事件。
  4. 浏览器窗口缩放，resize事件(如窗口停止改变大小之后重新计算布局)等。
