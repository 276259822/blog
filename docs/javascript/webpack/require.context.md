### require.context

#### 可以通过 require.context() 函数来创建自己的 context。
- 可以给这个函数传入三个参数：一个要搜索的目录，一个标记表示是否还搜索其子目录， 以及一个匹配文件的正则表达式。
- webpack 会在构建中解析代码中的 require.context()。

#### 语法如下
```javascript
require.context(directory, useSubdirectories = false, regExp = /^\.\//)
```

#### 示例
```javascript
require.context('./test', false, /\.test\.js$/);
// （创建出）一个 context，其中文件来自 test 目录，request 以 `.test.js` 结尾。
```
```javascript
require.context('../', true, /\.stories\.js$/);
// （创建出）一个 context，其中所有文件都来自父文件夹及其所有子级文件夹，request 以 `.stories.js` 结尾。
```

#### 实战
- 自动搜索Store的modules，并注册到实例
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modules = {}
const files = require.context('./module', true, /\.js$/)
files.keys().forEach(path => {
  let module = files(path).default
  let name = /'\.\/(.*?)\./.exec(`"'${path}'"`)[1]
  modules[name] = module
})

export default new Vuex.Store({
  modules
})
```
