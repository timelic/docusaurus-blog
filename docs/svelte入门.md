```
npx degit sveltejs/template my-svelte-project
```

引用组件

```
<script>
	import Nested from './Nested.svelte';
</script>
```

```markup
<p>This is a paragraph.</p>
<Nested/>
```

绑定属性

```
<img src={src}>
```

```
<h1>Hello {name}!</h1>
```

直接渲染html

```
<p>{@html string}</p>
```

组件

```
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		// we'll learn about props later
		answer: 42
	}
});
```

绑定事件

```
<button on:click={handleClick}>
```

computed

```
let count = 0;
$: doubled = count * 2;
```



### 父子传参

子传父（通过事件）

```html
// father
<script>
	import Inner from './Inner.svelte';

	function handleMessage(event) {
		alert(event.detail.text);
	}
</script>

<Inner on:message={handleMessage}/>
```

```html
// inner
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sayHello() {
		dispatch('message', {
			text: 'Hello!'
		});
	}
</script>

<button on:click={sayHello}>
	Click to say hello
</button>
```





#### 函数传参

> 这样写很蛋疼 但是没办法

```html
<button on:click={() => handler(123)}>点击</button>
```

