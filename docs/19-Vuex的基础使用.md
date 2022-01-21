> 参考了[开始 | Vuex (vuejs.org)](https://next.vuex.vuejs.org/zh/guide/)和[vuex/examples/classic at main · vuejs/vuex (github.com)](https://github.com/vuejs/vuex/tree/main/examples/classic)。
>
> 在这仅阐述对应于`composition api`的简单使用。

## 安装

```bash
yarn add vuex@next --save
```

## 基础使用

```tsx
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

createApp(App).use(store).mount("#app");
```

```tsx
// src/score/index.ts
import { createStore } from "vuex";
export default createStore({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {},
});
```

### State

State 是用状态来代表数据，全局共享一个状态树。

首先在`store`中声明`state`，然后在`vue`中利用`computed`来获取它。

```tsx
state: {
	counter: 1,
},
```

```tsx
const counter = computed(() => store.state.counter);
```

```tsx
<div>{{ counter }}</div>
```

### Getter

Getter 用来获取从 State 中派生出来的数据，它也能传递参数。

```tsx
getters: {
	double(state) {
		return state.counter * 2;
	},
	nTimes: (state) => (n: number) => {
		return state.counter * n;
	},
},
```

```tsx
const double = computed(() => store.getters.double);
const triple = computed(() => store.getters.nTimes(3));
```

### Mutation

同步地更改状态。

```tsx
mutations: {
	SET_COUNTER(state, value) {
		state.counter = value;
	},
},
```

```tsx
store.commit('SET_COUNTER', 20)"
```

### Action

异步地更改状态，action 的基础是 mutation 。

```tsx
actions: {
	incrementCounter({ commit, state }, increment) {
		commit("SET_COUNTER", state.counter + increment);
	},
},
```

```tsx
store.dispatch("incrementCounter", 1);
```

注意，每一个 dispatch 都可以处理 Promise ，自身也返回 Promise ，所以可以`awiat`那一套。

### Mudule

Module 让 Vuex 可以有多个仓库来管理状态，从而减少了耦合。

```
store
├─── index.ts
└─── modules
         moduleA.ts
```

```tsx
// moduleA.ts
const store = {
	state: {
		counter_A: 100,
	},
	getters: {},
	mutations: {},
	actions: {},
};
export default store;
```

```tsx
// index.ts
import moduleA from "./modules/moduleA";
export default createStore({
	modules: { moduleA },
});
```

如何访问子模块呢？

子模块会默认挂载到`store.state`中。

```
store.state.moduleA // 相当于 moduleA 的 state
```

子模块也可以访问根模块，这里不展开说。

如何触发子模块的 mutation 和 action ?

首先，如果在`vue`中`commit`一个`mutation`，首先查找根模块的`mutation`，再依次找子模块的`mutation`。所有找到的都会被触发。

所以只需要让不同模块的`mutation`不要重名即可。

如果非要重名呢？那就启动命名空间，然后`store.commit('模块名/方法')`地访问。
