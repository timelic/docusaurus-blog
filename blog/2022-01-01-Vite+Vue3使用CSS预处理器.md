---
tags: [Vue]
---

### SASS

直接安装`npm install sass -D`。

```css
<style lang="sass">

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px
</style>
```

配置全局`sass`文件

```js
// vite.config.js
export default defineConfig({
	plugins: [vue()],
	css: {
		// css预处理器
		preprocessorOptions: {
			sass: {
				additionalData: '@import "./src/assets/scss/style.sass";',
			},
		},
	},
});
```



### SCSS

依赖：

```bash
npm install --save-dev sass
```

配置全局`scss`文件

```js
// vite.config.js
export default defineConfig({
	plugins: [vue()],
	css: {
		// css预处理器
		preprocessorOptions: {
			scss: {
				// 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
				// 给导入的路径最后加上 ;
				additionalData: '@import "./src/assets/scss/style.scss";',
			},
		},
	},
});
```



### LESS

```bash
npm install less -D
```

配置全局`less`文件

```js
// vite.config.js
export default defineConfig({
	plugins: [vue()],
	css: {
		// css预处理器
		preprocessorOptions: {
			less: {
				additionalData: '@import "./src/assets/less/style.less";',
			},
		},
	},
});
```

