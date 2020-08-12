### IntersectionObserver API

> IntersectionObserver 对象的observe() 方法向IntersectionObserver对象监听的目标集合添加一个元素。一个监听者有一组阈值和一个根， 但是可以监视多个目标元素，以查看这些目标元素可见区域的变化。[https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)

```javascript
// 创建一个监听器
let IO = new IntersectionObserver(entries => {
  // entries是所有被监听对象的集合
  entries.forEach(entrie => {
    if (entrie.isIntersecting) {
      // 当被监听元素到临界值加载图片。
      loadImage(entrie.target)
    }
  })
})

function loadImage (el) {
  let img = el.data_src
  let image = new Image()
  image.src = img
  image.onload = () => {
    el.src = img
    // 停止监听特定目标元素
    IO.unobserve(el)
  }
}

export default {
  name: 'imgLazyLoad',
  inserted (el, binding) {
    el.data_src = binding.value
    IO.observe(el)
  },
  unbind () {
    // 停止监听
    IO.disconnect()
  }
}
```