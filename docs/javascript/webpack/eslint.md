### ESLint安装与配置

#### ESLint介绍
ESLint（中文站点）是一个开源的 JavaScript 代码检查工具，使用 Node.js 编写，由 Nicholas C. Zakas 于 2013 年 6 月创建。ESLint 的初衷是为了让程序员可以创建自己的检测规则，使其可以在编码的过程中发现问题而不是在执行的过程中。ESLint 的所有规则都被设计成可插入的，为了方便使用，ESLint 内置了一些规则，在这基础上也可以增加自定义规则。

#### ESLint安装
```javascript
yarn add eslint --dev
yarn add babel-eslint --dev
```

#### 配置eslint-loader
```javascript
yarn add eslint-loader --dev
```
```javascript
module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|js|jsx?)$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'eslint-loader'
      }
    ]
  }
}
```

#### ESlint配置

- root 限定配置文件的使用范围
- parser 指定eslint的解析器
- parserOptions 设置解析器选项
- extends 指定eslint规范
- plugins 引用第三方的插件
- env 指定代码运行的宿主环境
- rules 启用额外的规则或覆盖默认的规则
- globals 声明在代码中的自定义全局变量

1. 配置文件类型与优先级顺序
  
   - ```.eslintrc.js``` - 使用```.eslintrc.js```然后输出一个配置对象。
   - ```.eslintrc.yaml``` - 使用```.eslintrc.yaml```或```.eslintrc.yml```去定义配置的结构。
   - ```.eslintrc.yml```
   - ```.eslintrc.json``` - 使用```.eslintrc.json```去定义配置的结构，```ESLint```的```JSON```文件允许```JavaScript```风格的注释。
   - ```.eslintrc```（已弃用）
   - ```package.json``` - 在```package.json```里创建一个```eslintConfig```属性，在那里定义你的配置。

2. plugin属性
  
   > Eslint支持使用第三方插件(以```eslint-plugin-```开头的npm包)，在使用插件之前，必须使用npm/yarn安装。如```eslint-plugin-vue```
  
   - 插件安装
   ```javascript
    yarn add eslint-plugin-vue --dev
   ```
   - 插件使用
   ```javascript
    module.exports = {
      "plugins": [
        "vue"
      ]
    }
   ```

3. extends属性

   > 一个配置文件可以被基础配置中的已启用的规则继承。可以使用以下规则继承：

   - ```eslint:recommended```

     继承Eslint中推荐的（打钩的）规则项

     ```javascript
      module.exports = {
        "extends": "eslint:recommended"
      }
     ```
   - 使用别人写好的规则包（以```eslint-config-```开头的npm包），如```eslint-config-standard```
     ```javascript
      module.exports = {
        "extends": "standard"
      }
     ```
   - 使用Eslint插件中命名的配置
     ```javascript
      module.exports = {
        "plugins": [
          "vue"
        ],
        "extends": [
          "eslint:recommended",
          "plugin:vue/recommended"
        ],
        "rules": {
          "no-set-state": "off"
        }
      }
     ```
   - 使用"eslint:all"，继承Eslint中所有的核心规则项
     ```javascript
      module.exports = {
        "extends": "eslint:all"
      }
     ```

4. rules属性(根据自己的需要进行配置)

   > "off" or 0 - 关闭规则

   > "warn" or 1 - 将规则视为一个警告（不会影响退出码）

   > "error" or 2 - 将规则视为一个错误 (退出码为1)

   - Eslint部分核心规则
     ```javascript
      module.exports = {
        "rules": {
          /**
           * 这些规则与 JavaScript 代码中可能的错误或逻辑错误有关
           */
          "for-direction":"error",//强制 “for” 循环中更新子句的计数器朝着正确的方向移动
          "getter-return":"error",//强制在 getter 属性中出现一个 return 语句
          "no-await-in-loop":"error",//禁止在循环中 出现 await
          "no-compare-neg-zer":"error",//禁止与 -0 进行比较
          "no-cond-assign":[//禁止在条件语句中出现赋值操作符
            "error",
            "always"
          ],
          "no-console":[//禁用 console
            "error"
            // { "allow": ["warn", "error"] }
          ],
          "no-constant-condition":"error",//禁止在条件中使用常量表达式
          "no-control-regex":"error",//禁止在正则表达式中使用控制字符
          "no-debugger":"error",//禁用 debugger
          "no-dupe-args":"error",//禁止在 function 定义中出现重复的参数
          "no-dupe-keys":"error",//禁止在对象字面量中出现重复的键
          "no-duplicate-case":"error",//禁止重复 case 标签
          "no-empty":"error",//禁止空块语句
          "no-empty-character-class":"error",//禁止在正则表达式中出现空字符集
          "no-ex-assign":"error",//禁止对 catch 子句中的异常重新赋值
          "no-extra-boolean-cast":"error",//禁止不必要的布尔类型转换
          "no-extra-parens":"error",//禁止冗余的括号
          "no-extra-semi":"error",//禁用不必要的分号
          "no-func-assign":"error",//禁止对 function 声明重新赋值
          "no-inner-declarations":"error",//禁止在嵌套的语句块中出现变量或 function 声明
          "no-invalid-regexp":"error",//禁止在 RegExp 构造函数中出现无效的正则表达式
          "no-irregular-whitespace":"error",//禁止不规则的空白
          "no-obj-calls":"error",//禁止将全局对象当作函数进行调用
          "no-prototype-builtins":"error",//禁止直接使用 Object.prototypes 的内置属性
          "no-regex-spaces":"error",//禁止正则表达式字面量中出现多个空格
          "no-sparse-arrays": "error",//禁用稀疏数组
          "no-template-curly-in-string":"error",//禁止在常规字符串中出现模板字面量占位符语法
          "no-unexpected-multiline":"error",//禁止使用令人困惑的多行表达式
          "no-unreachable":"error",//禁止在 return、throw、continue 和 break 语句后出现不可达代码
          "no-unsafe-finally":"error",//禁止在 finally 语句块中出现控制流语句
          "no-unsafe-negation":"error",//禁止对关系运算符的左操作数使用否定操作符
          "use-isnan":"error",//要求调用 isNaN()检查 NaN
          "valid-jsdoc":"error",//强制使用有效的 JSDoc 注释
          "valid-typeof":"error",//强制 typeof 表达式与有效的字符串进行比较
          /**
           * 最佳实践
           */
          "accessor-pairs":"error",//强制getter/setter成对出现在对象中
          "array-callback-return":"error",//强制数组方法的回调函数中有 return 语句
          "block-scoped-var":"error",//把 var 语句看作是在块级作用域范围之内
          "class-methods-use-this":"error",//强制类方法使用 this
          "complexity":"error"//限制圈复杂度
          ...
        }
      }
     ```

   - eslint-plugin-vue中的规则
     ```javascript
      module.exports = {
        "rules": {
          /* for vue */
          // 禁止重复的二级键名   
          // @off 没必要限制
          'vue/no-dupe-keys': 'off', 
          // 禁止出现语法错误   
          'vue/no-parsing-error': 'error',   
          // 禁止覆盖保留字  
          'vue/no-reservered-keys': 'error',
          // 组件的 data 属性的值必须是一个函数
          // @off 没必要限制
          'vue/no-shared-component-data': 'off',
          // 禁止 <template> 使用 key 属性
          // @off 太严格了
          'vue/no-template-key': 'off',
          // render 函数必须有返回值
          'vue/require-render-return': 'error',
          // prop 的默认值必须匹配它的类型
          // @off 太严格了
          'vue/require-valid-default-prop': 'off',
          // 计算属性必须有返回值
          'vue/return-in-computed-property': 'error',
          // template 的根节点必须合法
          'vue/valid-template-root': 'error',
          // v-bind 指令必须合法
          'vue/valid-v-bind': 'error',
          // v-cloak 指令必须合法
          'vue/valid-v-cloak': 'error',
          // v-else-if 指令必须合法
          'vue/valid-v-else-if': 'error',
          // v-else 指令必须合法
          'vue/valid-v-else': 'error',
          // v-for 指令必须合法
          'vue/valid-v-for': 'error',
          // v-html 指令必须合法
          'vue/valid-v-html': 'error',
          // v-if 指令必须合法
          'vue/valid-v-if': 'error',
          // v-model 指令必须合法
          'vue/valid-v-model': 'error',
          // v-on 指令必须合法
          'vue/valid-v-on': 'error',
          // v-once 指令必须合法
          'vue/valid-v-once': 'error',
          // v-pre 指令必须合法
          'vue/valid-v-pre': 'error',
          // v-show 指令必须合法
          'vue/valid-v-show': 'error',
          // v-text 指令必须合法
          'vue/valid-v-text': 'error',    
          //
          // 最佳实践
          //
          // @fixable html 的结束标签必须符合规定
          // @off 有的标签不必严格符合规定，如 <br> 或 <br/> 都应该是合法的
          'vue/html-end-tags': 'off',
          // 计算属性禁止包含异步方法
          'vue/no-async-in-computed-properties': 'error',
          // 禁止出现难以理解的 v-if 和 v-for
          'vue/no-confusing-v-for-v-if': 'error',
          // 禁止出现重复的属性
          'vue/no-duplicate-attributes': 'error',
          // 禁止在计算属性中对属性修改
          // @off 太严格了
          'vue/no-side-effects-in-computed-properties': 'off',
          // 禁止在 <textarea> 中出现 {{message}}
          'vue/no-textarea-mustache': 'error',
          // 组件的属性必须为一定的顺序
          'vue/order-in-components': 'error',
          // <component> 必须有 v-bind:is
          'vue/require-component-is': 'error',
          // prop 必须有类型限制
          // @off 没必要限制
          'vue/require-prop-types': 'off',
          // v-for 指令的元素必须有 v-bind:key
          'vue/require-v-for-key': 'error',   
          //
          // 风格问题
          //
          // @fixable 限制自定义组件的属性风格
          // @off 没必要限制
          'vue/attribute-hyphenation': 'off',
          // html 属性值必须用双引号括起来
          'vue/html-quotes': 'error',
          // @fixable 没有内容时，组件必须自闭和
          // @off 没必要限制
          'vue/html-self-closing': 'off',
          // 限制每行允许的最多属性数量
          // @off 没必要限制
          'vue/max-attributes-per-line': 'off',
          // @fixable 限制组件的 name 属性的值的风格
          // @off 没必要限制
          'vue/name-property-casing': 'off',
          // @fixable 禁止出现连续空格
          // 'vue/no-multi-spaces': 'error',
          // @fixable 限制 v-bind 的风格
          // @off 没必要限制
          'vue/v-bind-style': 'off',
          // @fixable 限制 v-on 的风格
          // @off 没必要限制
          'vue/v-on-style': 'off',
          // 定义了的 jsx element 必须使用
          'vue/jsx-uses-vars': 'error'
        }
      }
     ```

   - 推荐实践
     ```javascript
      module.exports = {
        root: true,
        parserOptions: {
          parser: 'babel-eslint',
          sourceType: 'module',
          ecmaVersion: 6
        },
        env: {
          browser: true,
          node: true,
          es6: true
        },
        extends: ['plugin:vue/recommended', 'eslint:recommended'],
        rules: {
          'vue/max-attributes-per-line': [2, {
            'singleline': 10,
            'multiline': {
              'max': 1,
              'allowFirstLine': false
            }
          }],
          'vue/singleline-html-element-content-newline': 'off',
          'vue/multiline-html-element-content-newline':'off',
          'vue/name-property-casing': 'off',
          'vue/no-v-html': 'off',
          'vue/html-self-closing': 'off',
          'vue/html-closing-bracket-newline': 'off',
          'accessor-pairs': 2,
          'arrow-spacing': [2, {
            'before': true,
            'after': true
          }],
          'block-spacing': [2, 'always'],
          'brace-style': [2, '1tbs', {
            'allowSingleLine': true
          }],
          'camelcase': [0, {
            'properties': 'always'
          }],
          'comma-dangle': [2, 'never'],
          'comma-spacing': [2, {
            'before': false,
            'after': true
          }],
          'comma-style': [2, 'last'],
          'constructor-super': 2,
          'curly': [2, 'multi-line'],
          'dot-location': [2, 'property'],
          'eol-last': 2,
          'eqeqeq': ['error', 'always', {'null': 'ignore'}],
          'generator-star-spacing': [2, {
            'before': true,
            'after': true
          }],
          'handle-callback-err': [2, '^(err|error)$'],
          'indent': [2, 2, {
            'SwitchCase': 1
          }],
          'jsx-quotes': [2, 'prefer-single'],
          'key-spacing': [2, {
            'beforeColon': false,
            'afterColon': true
          }],
          'keyword-spacing': [2, {
            'before': true,
            'after': true
          }],
          'new-cap': [2, {
            'newIsCap': true,
            'capIsNew': false
          }],
          'new-parens': 2,
          'no-array-constructor': 2,
          'no-caller': 2,
          'no-console': 'off',
          'no-class-assign': 2,
          'no-cond-assign': 2,
          'no-const-assign': 2,
          'no-control-regex': 0,
          'no-delete-var': 2,
          'no-dupe-args': 2,
          'no-dupe-class-members': 2,
          'no-dupe-keys': 2,
          'no-duplicate-case': 2,
          'no-empty-character-class': 2,
          'no-empty-pattern': 2,
          'no-eval': 2,
          'no-ex-assign': 2,
          'no-extend-native': 2,
          'no-extra-bind': 2,
          'no-extra-boolean-cast': 2,
          'no-extra-parens': [2, 'functions'],
          'no-fallthrough': 2,
          'no-floating-decimal': 2,
          'no-func-assign': 2,
          'no-implied-eval': 2,
          'no-inner-declarations': [2, 'functions'],
          'no-invalid-regexp': 2,
          'no-irregular-whitespace': 2,
          'no-iterator': 2,
          'no-label-var': 2,
          'no-labels': [2, {
            'allowLoop': false,
            'allowSwitch': false
          }],
          'no-lone-blocks': 2,
          'no-mixed-spaces-and-tabs': 2,
          'no-multi-spaces': 2,
          'no-multi-str': 2,
          'no-multiple-empty-lines': [2, {
            'max': 1
          }],
          'no-native-reassign': 2,
          'no-negated-in-lhs': 2,
          'no-new-object': 2,
          'no-new-require': 2,
          'no-new-symbol': 2,
          'no-new-wrappers': 2,
          'no-obj-calls': 2,
          'no-octal': 2,
          'no-octal-escape': 2,
          'no-path-concat': 2,
          'no-proto': 2,
          'no-redeclare': 2,
          'no-regex-spaces': 2,
          'no-return-assign': [2, 'except-parens'],
          'no-self-assign': 2,
          'no-self-compare': 2,
          'no-sequences': 2,
          'no-shadow-restricted-names': 2,
          'no-spaced-func': 2,
          'no-sparse-arrays': 2,
          'no-this-before-super': 2,
          'no-throw-literal': 2,
          'no-trailing-spaces': 2,
          'no-undef': 2,
          'no-undef-init': 2,
          'no-unexpected-multiline': 2,
          'no-unmodified-loop-condition': 2,
          'no-unneeded-ternary': [2, {
            'defaultAssignment': false
          }],
          'no-unreachable': 2,
          'no-unsafe-finally': 2,
          'no-unused-vars': [2, {
            'vars': 'all',
            'args': 'none'
          }],
          'no-useless-call': 2,
          'no-useless-computed-key': 2,
          'no-useless-constructor': 2,
          'no-useless-escape': 0,
          'no-whitespace-before-property': 2,
          'no-with': 2,
          'one-var': [2, {
            'initialized': 'never'
          }],
          'operator-linebreak': [2, 'after', {
            'overrides': {
              '?': 'before',
              ':': 'before'
            }
          }],
          'padded-blocks': [2, 'never'],
          'quotes': [2, 'single', {
            'avoidEscape': true,
            'allowTemplateLiterals': true
          }],
          'semi': [2, 'never'],
          'semi-spacing': [2, {
            'before': false,
            'after': true
          }],
          'space-before-blocks': [2, 'always'],
          'space-before-function-paren': [2, 'never'],
          'space-in-parens': [2, 'never'],
          'space-infix-ops': 2,
          'space-unary-ops': [2, {
            'words': true,
            'nonwords': false
          }],
          'spaced-comment': [2, 'always', {
            'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
          }],
          'template-curly-spacing': [2, 'never'],
          'use-isnan': 2,
          'valid-typeof': 2,
          'wrap-iife': [2, 'any'],
          'yield-star-spacing': [2, 'both'],
          'yoda': [2, 'never'],
          'prefer-const': 2,
          'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
          'object-curly-spacing': [2, 'always', {
            objectsInObjects: false
          }],
          'array-bracket-spacing': [2, 'never']
        }
      }
      ```

