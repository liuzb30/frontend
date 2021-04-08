# JavaScript 基础

## 变量和类型

#### 1.JavaScript 规定了几种语言类型

七种数据类型：Undefined, Null, Boolean, String, Number, Symbol, Object

#### 2.JavaScript 对象的底层数据结构是什么

对象数据被存储在堆中（如数组，对象，函数等）

引用类型的数据的地址指针是存储于栈中的，当我们想要访问引用类型的值的时候，需要先从栈中获得对象的地址指针，然后，在通过地址指针找到堆中的所需要的数据。

#### 3.Symbol 类型在实际开发中的应用、可手动实现一个简单的 Symbol

Symbol 是 ES6 新引入的一种数据类型，表示独一无二的值。

特点：Symbol 类型的 key 不能被`Object.keys`和`for..of`枚举，可以当做私有变量使用。

应用：

```js
let mySymbol = Symbol("key");
// 第一种写法
let a = {};
a[mySymbol] = "Hello!";
// 第二种写法
let a = {
  [mySymbol]: "Hello!",
};
```

#### 4.JavaScript 中的变量在内存中的具体存储形式 (堆和栈)

`JavaScript` 中的变量分为基本类型和引用类型.

基本类型: 保存在栈内存中的简单数据段，它们的值都有固定的大小，保存在栈空间，通过按值访问

引用类型: 保存在堆内存中的对象，值大小不固定，栈内存中存放的该对象的访问地址指向堆内存中的对象，`JavaScript` 不允许直接访问堆内存中的位置，因此操作对象时，实际操作对象的引用

#### 5.基本类型对应的内置对象，以及他们之间的装箱拆箱操作

```
String(), Number(), Boolean()
```

装箱：就是把基本类型转变为对应的对象。装箱分为隐式和显示

```
  // 隐式装箱： 每当读取一个基本类型的值时，后台会创建一个该基本类型所对应的对象。
  // 在这个基本类型上调用方法，其实是在这个基本类型对象上调用方法。
  // 这个基本类型的对象是临时的，它只存在于方法调用那一行代码执行的瞬间，执行方法后立刻被销毁。
  let num=123;
  num.toFixed(2); // '123.00'//上方代码在后台的真正步骤为
  var c = new Number(123);
  c.toFixed(2);
  c = null;
  // 显式装箱: 通过内置对象 Boolean、Object、String 等可以对基本类型进行显示装箱。
  var obj = new String('123');
```

拆箱: 拆箱与装箱相反，把对象转变为基本类型的值。

```js
Number([1]); //1
// 转换演变：
[1].valueOf(); // [1];
[1].toString(); // '1';Number('1'); //1
```

> 《JavaScript 高级程序设计》119 页

#### 6.理解值类型和引用类型 (栈和堆， 连锁店和连锁店钥匙)

JavaScript 中的变量分为基本类型和引用类型:

基本类型: 保存在栈内存中的简单数据段，它们的值都有固定的大小，保存在栈空间，通过按值访问

引用类型: 保存在堆内存中的对象，值大小不固定，栈内存中存放的该对象的访问地址指向堆内存中的对象，`JavaScript` 不允许直接访问堆内存中的位置，因此操作对象时，实际操作对象的引用

#### 7.null 和 undefined 的区别

1. `Number` 转换的值不同，`Number(null)` 输出为 `0`, `Number(undefined)` 输出为 `NaN`
2. `null` 表示一个值被定义了，但是这个值是空值
3. `undefined` 表示缺少值，即此处应该有值，但是还没有定义

#### 8.至少可以说出三种判断 JavaScript 数据类型的方式，以及他们的优缺点，如何准确的判断数组类型

1. `typeof` —— 返回给定变量的数据类型，只能判断基本类型、Object 和 Function，其他引用类型无法判断

   ```js
     'undefined'——Undefined
     'boolean'——Boolean
     'string'——String
     'number'——Number
     'symbol'——Symbol
     'object'——Object / Null （Null 为空对象的引用）
     'function'——Function
     // 对于一些如 error() date() array()无法判断，都是显示object类型
   ```

2. `instanceof` —— 只能判断两个对象是否属于实例关系，而无法判断对象实例具体属于哪种类型

   ```js
    alert([1,2,3] instanceof Array) // true
     alert(new Date() instanceof Date) // true
     alert(function(){this.name="22";} instanceof Function) //true
     alert(function(){this.name="22";} instanceof function) //false
     // instanceof 只能用来判断两个对象是否属于实例关系，而不能判断一个对象实例具体属于哪种类型。
   ```

3. `constructor` —— 返回对象对应的构造函数， null 和 undefined 是无效的对象，没有 constructor

   ```js
     alert({}.constructor === Object);  =>  true
     alert([].constructor === Array);  =>  true
     alert('abcde'.constructor === String);  =>  true
     alert((1).constructor === Number);  =>  true
     alert(true.constructor === Boolean);  =>  true
     alert(false.constructor === Boolean);  =>  true
     alert(function s(){}.constructor === Function);  =>  true
     alert(new Date().constructor === Date);  =>  true
     alert(new Array().constructor === Array);  =>  true
     alert(new Error().constructor === Error);  =>  true
     alert(document.constructor === HTMLDocument);  =>  true
     alert(window.constructor === Window);  =>  true
     alert(Symbol().constructor);    =>    undefined
     // null 和 undefined 是无效的对象，没有 constructor，因此无法通过这种方式来判断。
   ```

4. `Object.prototype.toString()`默认返回当前对象的 `[[Class]]` 。这是一个内部属性，其格式为 `[object Xxx]` ，是一个字符串，其中 `Xxx` 就是对象的类型。 (推荐使用)

   ```js
   Object.prototype.toString.call(new Date()); //[object Date]
   Object.prototype.toString.call(new String()); //[object String]
   Object.prototype.toString.call(Math); //[object Math]
   Object.prototype.toString.call(undefined); //[object Undefined]
   Object.prototype.toString.call(null); //[object Null]
   Object.prototype.toString.call(""); // [object String]
   Object.prototype.toString.call(123); // [object Number]
   Object.prototype.toString.call(true); // [object Boolean]
   Object.prototype.toString.call(Symbol()); //[object Symbol]
   Object.prototype.toString.call(new Function()); // [object Function]
   Object.prototype.toString.call(new Date()); // [object Date]
   Object.prototype.toString.call([]); // [object Array]
   Object.prototype.toString.call(new RegExp()); // [object RegExp]
   Object.prototype.toString.call(new Error()); // [object Error]
   Object.prototype.toString.call(document); // [object HTMLDocument]
   Object.prototype.toString.call(window); //[object global] window 是全局对象 global 的引用
   // 比较全面
   ```

#### 9.可能发生隐式类型转换的场景以及转换原则，应如何避免或巧妙应用

隐式转换一般说的是`Boolean`的转换

- Boolean 场景，变量放在 if 的判断语句时，如果变量不是布尔值，那么就会发生隐式转换
  - String，非空字符串会转换成`true`，空字符串会转换成`false`
  - Number, 非 0 会转换成`true`，0 会转换成`false`
  - Object，任何对象都会转成`true`

> 《JavaScript 高级程序设计》26 页

#### 10.出现小数精度丢失的原因，JavaScript 可以存储的最大数字、最大安全数字，JavaScript 处理大数字的方法、避免精度丢失的方法

- 精度丢失原因，说是 `JavaScript` 使用了 `IEEE 754` 规范，二进制储存十进制的小数时不能完整的表示小数
- 能够表示的最大数字 `Number.MAX_VALUE` 等于 `1.7976931348623157e+308` ,最大安全数字 `Number.MAX_SAFE_INTEGER` 等于 `9007199254740991`
- 避免精度丢失
  - 计算小数时，先变成整数再运算
  - 如果值超出了安全整数，有一个最新提案，`BigInt` 大整数，它可以表示任意大小的整数，注意只能表示整数，而不受安全整数的限制

> 《JavaScript 高级程序设计》29 页

## 原型和原型链

#### 1.理解原型设计模式以及 JavaScript 中的原型规则

原型规则：

两个概念：隐式原型，显式原型

```
A. 所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性；
B. 所有的引用类型（数组、对象、函数），都有一个`__proto__`属性（隐式原型），属性值是一个普通的对象；
C. 所有的函数，都具有一个 `prototype`（显式原型），属性值也是一个普通对象；
D. 所有的引用类型（数组、对象、函数），其隐式原型指向其构造函数的显式原型；`（obj._proto_ === Object.prototype）`；
E. 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的 `__proto__` （即它的构造函数的 `prototype`）中去寻找；
```

#### 2.instanceof 的底层实现原理，手动实现一个 instanceof

实现原理：判断实例对象的`__proto__`是不是等于对象的`prototype`属性，如果不相等，则继续往原型链找，直到`__proto__`为`null`

```js
function instanceof(obj, object) {
  let O = object.prototype;
  while (obj) {
    obj = obj.__proto__;
    if (obj === O) {
      return true;
    }
  }
  return false;
}
```

#### 3.实现继承的几种方式以及他们的优缺点

详情请点击：[《继承的几种实现方式》](https://zxpsuper.github.io/Demo/advanced_front_end/js/inherit.html#类式继承)

#### 4.至少说出一种开源项目(如 Node)中应用原型继承的案例

#### 5.可以描述 new 一个对象的详细过程，手动实现一个 new 操作符

```js
function myNew(Obj, ...args) {
  var obj = Object.create(Obj.prototype); //使用指定的原型对象及其属性去创建一个新的对象
  var result = Obj.apply(obj, args); // 绑定 this 到obj, 设置 obj 的属性
  return typeof result === "object" ? result : obj; // 返回实例
}
```

#### 6.理解 es6 class 构造以及继承的底层实现原理

具体可看文章[《ES6 类以及继承的实现原理》](https://segmentfault.com/a/1190000014798678)

## 作用域和闭包

#### 1.理解词法作用域和动态作用域

词法作用域也称静态作用域，`javascript` 采用静态作用域

静态作用域 —— 函数的作用域基于函数创建的位置。

动态作用域 —— 函数的作用域基于函数的使用位置。

```js
var value = 1;

function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo();
}

bar(); // 输出 1 。JavaScript 采用的是词法作用域，也称为静态作用域。相同的，动态作用域此代码应该输出 2
```

#### 2.理解 JavaScript 的作用域和作用域链

[[理解 JavaScript 中的作用域和作用域链](https://segmentfault.com/a/1190000003934412)]

#### 3. 理解 JavaScript 的执行上下文栈，可以应用堆栈信息快速定位问题

**执行上下文** 就是当前 `JavaScript` 代码被解析和执行时所在环境的抽象概念， `JavaScript` 中运行任何的代码都是在执行上下文中运行。

执行上下文总共有三种类型：全局执行上下文, 函数执行上下文, `Eval` 函数执行上下文

**执行栈**，在其他编程语言中也被叫做调用栈，具有 LIFO（后进先出）结构，用于存储在代码执行期间创建的所有执行上下文。

#### 4.this 的原理以及几种不同使用场景的取值

[this 的原理](http://www.ruanyifeng.com/blog/2018/06/javascript-this.html)

#### 5.闭包的实现原理和作用，可以列举几个开发中闭包的实际应用

**原理**：闭包就是能够读取其他函数内部变量的函数。由于在 Javascript 语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。

所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

**作用**：闭包可以用在许多地方。它的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。

**应用**：1. 匿名自执行函数 2. 结果缓存 3. 封装局部变量

#### 6.理解堆栈溢出和内存泄漏的原理，如何防止

**堆栈溢出** 的产生是由于过多的函数调用，导致调用堆栈无法容纳这些调用的返回地址，一般在递归中产生。堆栈溢出很可能由无限递归（Infinite recursion）产生，但也可能仅仅是过多的堆栈层级.

参考链接：[《内存泄漏与避免》](https://zxpsuper.github.io/Demo/advanced_front_end/browser/garbagerefuse.html#内存泄漏与避免)

#### 7.如何处理循环的异步操作

1. 将异步操作变同步，使用 async/await.
2. 去掉循环，将循环变成递归
3. 如果是为了解决变量 i 的问题，可以用 let

#### 8.理解模块化解决的实际问题，可列举几个模块化方案并理解其中原理

## 执行机制

#### 1.为何 try 里面放 return，finally 还会执行，理解其内部机制

return 执行了会先把结果保存下来，然后执行 finally。

finally 如果有 return，会覆盖 try 里面的 return。

finally 如果没有 return，但是更改了 try 返回的结果，如果 try 返回的是一个对象，则会受到影响，如果是基本类型，则不受影响。（应该是浅拷贝）

```js
// return 执行了但是没有立即返回，而是先执行了finally
function kaimo() {
  try {
    return 0;
  } catch (err) {
    console.log(err);
  } finally {
    console.log("a");
  }
}

console.log(kaimo()); // a 0
```

```js
// finally 中的 return 覆盖了 try 中的 return。
function kaimo() {
  try {
    return 0;
  } catch (err) {
    console.log(err);
  } finally {
    return 1;
  }
}

console.log(kaimo()); // 1
```

#### 2.JavaScript 如何实现异步编程，可以详细描述 EventLoop 机制

`JavaScript` 如何实现异步编程:

- 回调函数

- Promise

- Generator

  `Generator` 函数是 `ES6` 提供的一种异步编程解决方案，其行为类似于状态机。

- async/await

  `async/await` 本质上还是基于 `Generator` 函数，可以说是 `Generator` 函数的语法糖，`async` 就相当于之前写的 run 函数(执行`Generator`函数的函数),而 `await` 就相当于 `yield` ，只不过 `await` 表达式后面只能跟着 `Promise` 对象，如果不是 `Promise` 对象的话，会通过 `Promise.resolve` 方法使之变成 `Promise` 对象。`async` 修饰 `function`,其返回一个 `Promise` 对象。

[《浏览器 Event Loop 机制》](https://zxpsuper.github.io/Demo/advanced_front_end/browser/eventloop.html#_1-event-loop是什么)

#### 3.宏任务和微任务分别有哪些

**宏任务**：`setTimeout, setInterval,setImmediate (Node独有)，requestAnimationFrame (浏览器独有)，I/O，UI rendering (浏览器独有) `

**微任务**： `process.nextTick (Node独有)，Promise，Object.observe，MutationObserver`

#### 4.可以快速分析一个复杂的异步嵌套逻辑，并掌握分析方法

```js
// 执行顺序，先微队列，后宏队列。
console.log(1);
setTimeout(() => {
  console.log(2);
  setTimeout(() => {
    console.log(8);
  });
  Promise.resolve().then(() => {
    console.log(3);
  });
});
new Promise((resolve, reject) => {
  console.log(4);
  setTimeout(() => {
    console.log(10);
  });
  resolve();
}).then(() => {
  console.log(5);
  Promise.resolve().then(() => {
    console.log(11);
  });
  setTimeout(() => {
    console.log(13);
  });
});
setTimeout(() => {
  Promise.resolve().then(() => {
    console.log(9);
  });
  console.log(6);
  setTimeout(() => {
    console.log(12);
  });
});
console.log(7);
```

从头至尾执行一次代码,根据上面分类规则分至不同队列, `new promise( function )` 也是立即执行。`setTimeout` 的回调函数属于宏队列`（macrotask）`，`resolve` 的回调函数属于微队列.

优先执行微队列，微队列执行过程中产生的微队列和宏队列置于队列末尾排序执行，而宏队列产生的微队列和宏队列于新的队列中等待。。

执行完微队列后执行宏队列

#### 5.使用 Promise 实现串行

```js
// 一个 promise 的 function
function delay(time) {
  return new Promise((resolve, reject) => {
    console.log(`wait ${time}s`);
    setTimeout(() => {
      console.log("execute");
      resolve();
    }, time * 1000);
  });
}
const arr = [3, 4, 5];
```

1. 普通循环

   ```js
   let p = Promise.resolve();
   for (let v of arr) {
     p = p.then(() => delay(i));
   }
   ```

2. reduce

   ```js
   arr.reduce((s, v) => s.then(() => delay(v)), promise.resolve());
   ```

3. async/await

   ```js
   async function(){
   	for(let v of arr){
   		await delay(v)
   	}
   }
   ```

4. 递归

   ```js
   function dispatch(i) {
     if (!arr[i]) return Promise.resolve();
     return delay(arr[i]).then(() => dispatch(i + 1));
   }
   dispatch(0);
   ```

#### 6.Node 与浏览器 EventLoop 的差异

[《JavaScript 运行机制详解：再谈 Event Loop》](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

[《带你彻底弄懂 Event Loop》](https://segmentfault.com/a/1190000016278115)

#### 7.如何在保证页面运行流畅的情况下处理海量数据

1. 分治思想，在一定的时间内多次加载数据，直至渲染完成，使用 `window.requestAnimationFrame` 和 `document.createDocumentFragment()` 实现, 可参考文章[【如何解决页面加载海量数据而不冻结前端 UI】](https://www.askhtml5.com/question/3)
2. 局部显示，毕竟用户能看到的就一屏内容，监听用户的滚动行为，改变显示元素，可使 `DOM` 结构最简单化。可参考文章[【大数据如何在前端流畅展示】](https://blog.csdn.net/ken_ding/article/details/86601844),不过他的 `Demo`有点问题.

### 语法和 API

#### 1.理解 ECMAScript 和 JavaScript 的关系

`ECMAScript` 是 `JavaScript` 的规范，`JavaScript` 是 `ECMAScript` 的实现。

#### 2.熟练运用 es5、es6 提供的语法规范

[【JavaScript 标准参考教程（alpha）】](http://javascript.ruanyifeng.com/)

[【ECMAScript 6 入门】](http://es6.ruanyifeng.com/#docs/function)

#### 3.熟练掌握 JavaScript 提供的全局对象（例如 Date、Math）、全局函数（例如 decodeURI、isNaN）、全局属性（例如 Infinity、undefined）

#### 4.熟练应用 map、reduce、filter 等高阶函数解决问题

#### 5.setInterval 需要注意的点，使用 settimeout 实现 setInterval

setInterval 需要注意的点:

在使用 `setInterval` 方法时，每一次启动都需要对 `setInterval` 方法返回的值做一个判断，判断是否是空值，若不是空值，则要停止定时器并将值设为空，再重新启动，如果不进行判断并赋值，有可能会造成计时器循环调用，在同等的时间内同时执行调用的代码，并会随着代码的运行时间增加而增加，导致功能无法实现，甚至占用过多资源而卡死奔溃。因此在每一次使用 setInterval 方法时，都需要进行一次判断。

```js
let timer = setInterval(func, 1000);
// 在其他地方再次用到setInterval(func, 1000)
if (timer !== null) {
  clearInterval(timer);
  timer = null;
}
timer = setInterval(func, 1000);
```

使用 settimeout 实现 setInterval

```js
setIntervalFunc = () => {
  console.log(1); //使用递归
  setTimeout(setIntervalFunc, 1000);
};
setInterval();
```

#### 6.JavaScript 提供的正则表达式 API、可以使用正则表达式（邮箱校验、URL 解析、去重等）解决常见问题

邮箱校验：

```js
function isEmail(emailStr) {
  return /^[a-zA-Z0-9]+([._-]*[a-zA-Z0-9]*)*@[a-zA-Z0-9]+.[a-zA-Z0-9{2,5}$]/.test(
    emailStr
  );
}
```

URL 解析:

```js
function isUrl(urlStr) {
  return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.%]+$/.test(
    value
  );
}
```

数组去重：

```js
// set结构
let arr = [1, 1, 2, 2, 3, 3];
arr2 = [...new Set(arr)];
console.log(arr2); // [1,2,3]

// Object.keys(), 利用属性 key 的唯一性
let arrObj = [1, 1, 2, 2, 3, 3];
arrObj2 = {};
for (i in arrObj) {
  arrObj2[arrObj[i]] = true;
}
let arrObj3 = Object.keys(arrObj2);
console.log(arrObj3);

// 利用 indexOf() 查询数组内是否已经包含该元素
var arrIndexOf = ["a", "c", "b", "d", "a", "b"];
var arrIndexOf2 = [];
for (var i = 0; i < arrIndexOf.length; i++) {
  if (arrIndexOf2.indexOf(arrIndexOf[i]) < 0) {
    arrIndexOf2.push(arrIndexOf[i]);
  }
}
console.log(arrIndexOf2); // ['a', 'c', 'b', 'd']
```

#### 7.JavaScript 异常处理的方式，统一的异常处理方案

### 参考链接：

[[前端工程师自检清单 73 答](https://segmentfault.com/a/1190000020262348)](https://segmentfault.com/a/1190000020262348?utm_source=tag-newest)
