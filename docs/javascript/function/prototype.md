### 原型链

#### 原型链继承
 - 原型链继承的基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。
 
 ```javascript
 function SuperType() {
  this.name = 'Jack Ma'
  this.colors = ['pink', 'blue', 'green']
 }
 SuperType.prototype.getName = function () {
  return this.name
 }
 function SubType() {
   this.age = 22
 }
 SubType.prototype = new SuperType()
 SubType.prototype.constructor = SubType
 SubType.prototype.getAge = function () {
   return this.age
 }
 let instance1 = new SubType()
 instance1.colors.push('yellow')
 console.log(instance1.getName()) // 'Jack Ma'
 console.log(instance1.colors) // ['pink', 'blue', 'green', 'yellow']

 let instance2 = new SubType()
 console.log(instance2.colors) // ['pink', 'blue', 'green', 'yellow']
 ```

> 缺点
1. 通过原型来实现继承时，原型会变成另一个类型的实例，原先的实例属性变成了现在的原型属性，该原型的引用类型属性会被所有的实例共享。
2. 在创建子类型的实例时，没有办法在不影响所有对象实例的情况下给超类型的构造函数中传递参数。

#### 借用构造函数
- 借用构造函数的技术，其基本思想为：在子类的构造函数中调用超类型构造函数。

```javascript
function SuperType(name) {
  this.name = name
  this.colors = ['pink', 'blue', 'green']
}
SuperType.prototype.getName = function () {
  return this.name
}
function SubType(name) {
  SuperType.call(this, name)
}
let instance1 = new SubType('Jack Ma')
instance1.colors.push('yellow')
console.log(instance1.getName()) // Uncaught TypeError: instance1.getName is not a function
console.log(instance1.colors) // ['pink', 'blue', 'green', 'yellow']

let instance2 = new SubType('Jack Lee')
console.log(instance2.colors) // ['pink', 'blue', 'green']
```

> 优点
1. 可以向超类传递参数
2. 解决了原型中包含引用类型值被所有实例共享的问题

> 缺点
1. 方法在构造函数中定义，函数复用无从谈起，另外超类型原型中定义的方法对于子类型而言都是不可见的。

#### 组合继承(原型链 + 借用构造函数)
- 组合继承指的是将原型链和借用构造函数技术组合到一块，从而发挥二者之长的一种继承模式。基本思路：使用原型链实现对原型属性和方法的继承，通过借用构造函数来实现对实例属性的继承，既通过在原型上定义方法来实现了函数复用，又保证了每个实例都有自己的属性。

```javascript
function SuperType(name) {
  this.name = name
  this.colors = ['pink', 'blue', 'green']
}
SuperType.prototype.getName = function () {
  return this.name
}
function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}
SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType
SubType.prototype.getAge = function () {
  return this.age
}
let instance1 = new SubType('Jack Ma', 20)
instance1.colors.push('yellow')
console.log(instance1.getName()) // Jack Ma
console.log(instance1.getAge()) // 20
console.log(instance1.colors) // ['pink', 'blue', 'green', 'yellow']

let instance2 = new SubType('Jack Lee', 22)
console.log(instance2.getName()) // Jack Lee
console.log(instance2.getAge()) // 22
console.log(instance2.colors) // ['pink', 'blue', 'green']
```

> 缺点
1. 无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型的时候，另一次是在子类型构造函数内部。

> 优点
1. 可以向超类传递参数
2. 每个实例都有自己的属性
3. 实现了函数复用

#### 寄生组合式继承
- 所谓寄生组合式继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法，基本思路：不必为了指定子类型的原型而调用超类型的构造函数，我们需要的仅是超类型原型的一个副本，本质上就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。寄生组合式继承的基本模式如下所示

```javascript
function inherPrototype(subType, superType) {
  let prototype = object(superType.prototype)
  prototype.constructor = subType
  subType.prototype = prototype
}
```
1. 创建一个超类型原型的副本
2. 为创建的副本添加```constructor```属性
3. 将新创建的对象赋值给子类型的原型

- 至此，我们就可以通过调用 inheritPrototype 来替换为子类型原型赋值的语句：

```javascript
function SuperType(name) {
  this.name = name
  this.colors = ['pink', 'blue', 'green']
}
function SuberType(name, age) {
  SuperType.call(this, name)
  this.age = age
}
inherPrototype(SuberType, SuperType)
```

> 优点

只调用了一次超类构造函数，效率更高。避免在```SuberType.prototype```上面创建不必要的、多余的属性，与其同时，原型链还能保持不变。
因此寄生组合继承是引用类型最理性的继承范式。

#### ES6 Class extends
- 核心： ES6继承的结果和寄生组合继承相似，本质上，ES6继承是一种语法糖。但是，寄生组合继承是先创建子类实例this对象，然后再对其增强；而ES6先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。

```javascript
class A {}

class B extends A {
  constructor() {
    super()
  }
}
```

- ES6实现继承的具体原理

```javascript
class A {}

class B {}

Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto
  return obj
}

// B的实例继承A的实例
Object.setPrototypeOf(B.prototype, A.prototype)

// B继承A的静态属性
Object.setPrototypeOf(B, A)
```

- ES6继承与ES5继承的异同

> 相同点

本质上ES6继承是ES5继承的语法糖

> 不同点

  1. ES6继承中子类的构造函数的原型链指向父类的构造函数，ES5中使用的是构造函数复制，没有原型链指向。
  2. ES6子类实例的构建，基于父类实例，ES5中不是。

#### 原型关系绘制的思维导图

![关系绘制的思维导图](/images/prototype.png)
