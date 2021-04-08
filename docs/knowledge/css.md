# 二、HTML 和 CSS

## HTML

#### 1.从规范的角度理解 HTML，从分类和语义的角度使用标签

语义化标签：`<header><footer><nav><section> <article> <aside> `

标签分类：

- 文档标签： `<html> <head> <body>`
- 表格标签： `<table> <thead> <tbody> <tr> <td> <th>`
- 表单标签：`<button><input><form><select>`
- 列表标签: `<ul><ol><li>`
- 多媒体标签：`<img> <video>`
- 文章标签: `<h1>-<h6> <p> br pre blockquote`
- 字体样式标签: `i b em strong`

#### 2.常用页面标签的默认样式、自带属性、不同浏览器的差异、处理浏览器兼容问题的方式

#### 3.元信息类标签(head、title、meta)的使用目的和配置方法

`<head>` 标签用于定义文档的头部，它是所有头部元素的容器。`<head>` 中的元素可以引用脚本、指示浏览器在哪里找到样式表、提供元信息等等。可以包含的标签有： `<base>, <link>, <meta>, <script>, <style>, 以及 <title>`。

`<title>` 定义文档的标题，它是 head 部分中唯一必需的元素。

`<meta>`元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。使用方法参考【meta 标签详解】

#### 4.HTML5 离线缓存原理

#### 5.可以使用 Canvas API、SVG 等绘制高性能的动画

- [【Canvas 进阶（一）二维码的生成与扫码识别】](https://juejin.im/post/5d00b3626fb9a07ed74076a9)
- [【Canvas 进阶（二）写一个生成带 logo 的二维码 npm 插件】](https://juejin.im/post/5d1c461f6fb9a07f070e4768)
- [【Canvas 进阶（三）ts + canvas 重写”辨色“小游戏】](https://juejin.im/post/5d22af2b6fb9a07ea7133361)
- [【流动的 SVG 线条】](https://juejin.im/post/5ca34029e51d45141f711797)

## CSS

#### 1.CSS 盒模型，在不同浏览器的差异

盒子模型的范围包括 `margin、border、padding、content`

`ie` 盒子模型的`content` 包含了`border`和`padding`

标准盒模型的`content`不包含其他部分

#### 2.CSS 所有选择器及其优先级、使用场景，哪些可以继承，如何运用 at 规则

不同级别优先级：`!important > 行内样式 > ID选择器 > 类选择器 > 元素 > 通配符 > 继承 > 浏览器默认属性`

相同级别优先级：`行内样式 > 内部样式表 > 外部样式表 > 导入样式@import`

可继承属性：

- 字体属性： font-family, font-weight, font-size, font-style...
- 文本属性：text-indent, text-align, line-heigh,　 word-spacing, letter-spacing, text-transform, color
- 元素可见性： visibility
- 光标属性： cursor

在 CSS 中经常见到过字符@后面加一些关键字的用法，这种用法就称之为 AT 规则

[CSS 中的 AT 规则](http://zervanto.farbox.com/post/css3mo-fa-mu-lu/csszhong-de-atgui-ze)

#### 3.CSS 伪类和伪元素有哪些，它们的区别和实际应用

伪类：用于向某些选择器添加特殊的效果。`:active, :focus, :hover`

伪元素：用于对选择器的特定部分进行修改。`::before, ::after, ::first-line`

伪类和伪元素的根本区别在于：它们是否创造了新的元素(抽象)。

#### 4.HTML 文档流的排版规则，CSS 几种定位的规则、定位参照物、对文档流的影响，如何选择最好的定位方式，雪碧图实现原理

**HTML 文档流的排版规则**: 把元素按从上而下，从左到右的顺序默认排列。不在一行的元素从上而下，在一行的从左到右排列。

css 定位规则：

- static 普通流
- float 浮动定位，脱离文档流
- relative 相对本元素的左上角进行定位，没有脱离文档流，还占有原来的页面空间
- absolute 相对祖代中有 relative 的元素进行定位（没有则相对 body），脱离文档流
- fixed 相对整个文档进行定位，脱离文档流

雪碧图实现原理： 把小图标和背景图片合并到一张图片上，然后利用 css 背景定位来显示需要现实的图片部分。

#### 5.水平垂直居中的方案、可以实现 6 种以上并对比它们的优缺点

固定宽高：

- position + margin
- position + margin 偏移

不固定宽高：

- position + transform 偏移（兼容性问题）

- flex (存在兼容性)
- table-cell (嵌套多一层)

[CSS 实现垂直居中水平居中](https://blog.csdn.net/freshlover/article/details/11579669)

#### 6.BFC 实现原理，可以解决的问题，如何创建 BFC

BFC 直译为块级格式化上下文，它是一个独立的区域，在这个区域内，它规定了块级元素如何布局，并且与这个区域外部毫不相干。

可以解决的问题：消除边距重叠，清除浮动，自适应多栏布局

如何创建 BCF:

- 根元素
- 浮动元素（float 不为 none）
- 绝对定位（position 为 absolute 或 fixed）
- display 为 inline-block, table-cell, table-caption
- overflow 不为 visible
- 弹性布局 flex
- 网格元素 Grid

#### 7.可使用 CSS 函数复用代码，实现特殊效果

#### 8.PostCSS、Sass、Less 的异同，以及使用配置，至少掌握一种

#### 9.CSS 模块化方案、如何配置按需加载、如何防止 CSS 阻塞渲染

#### 10.熟练使用 CSS 实现常见动画，如渐变、移动、旋转、缩放等等

#### 11.CSS 浏览器兼容性写法，了解不同 API 在不同浏览器下的兼容性情况

#### 12.掌握一套完整的响应式布局方案

## **手写**

#### 1.手写图片瀑布流效果

两种方法，一种是 CSS 实现，能实现页面响应式瀑布流，使用 `column-width` 和 `column-gap` 属性。另一种是 JS 实现，通过获取宽度，计算首行填充图片个数，先填充第一行，然后将每一列的高度用一个数组存储起来，第一行填充完之后，先填充高度最小的那一列，然后更新该列的高度。

参考文章：[【瀑布流布局的实现】](https://blog.csdn.net/weixin_38788347/article/details/78390064)

#### 2.使用 CSS 绘制几何图形（圆形、三角形、扇形、菱形等）

#### 3.使用纯 CSS 实现曲线运动（贝塞尔曲线）

#### 4.实现常用布局（三栏、圣杯、双飞翼、吸顶），可是说出多种方式并理解其优缺点

圣杯布局, 两边顶宽，中间自适应的三栏布局。
