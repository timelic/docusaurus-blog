## `nodejs`中导入导出

导出：导出多个

```js
const a = () => {}
const b = 'xx'

module.exports = {
  a,
  b
};
```

导入：整体导入

```js
const m = require('./a');
m.a();
console.log(m.b)
```

导入：解包导入

```js
const {a, b} = require('./a');
a();
console.log(b);
```

当然可以只导出一个

```js
const a = () => {}
module.exports = a;
```

```js
const a = require("./a")
```

别名

```js
const {a: A, b: B} = require('./a');
```



## `ES6`中导入导出

```js
// 多个导出
export const a = () => {};
export const b = 100;

// 另一种多个导出
const a = () => {};
const b = 100;
export {a, b};

// 默认导出，和多个导出不能共存
const c = () => {};
export default c;
```

```js
// 导入
import m from "./a"
m.a();
console.log(m.b);

// 解包导入
import {a, b} from "./a"
a();
console.log(b);

// 别名
import {a as A, b as B} from "./a"
A();
console.log(B);
```

