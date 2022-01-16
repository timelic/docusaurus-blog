当前的侧边栏默认是按照`position`从低到高排列的，这就会导致最新写的在最后面。

首先要了解侧边栏是如何生成的。

```js
// docusaurus.config.js
presets: [
		[
			"classic",
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve("./sidebars.js"),
					remarkPlugins: [math],
					rehypePlugins: [katex],
				},
				blog: {
					showReadingTime: true,
					remarkPlugins: [math],
					rehypePlugins: [katex],
				},
				theme: {
					customCss: require.resolve("./src/css/custom.css"),
				},
			}),
		],
	],
```

这里可以看到，配置了一个预设`preset`，默认给用户提供了一个文档和一个博客。而`docs`和`blog`两个项的属性会分别映射到`docs`和`blog`插件上面去。

修改`doc`，将`docs`重新排列，并且给文档的`label`(侧边栏展示名称)加上中英文间的空格。

```js
docs: {
	sidebarPath: require.resolve("./sidebars.js"),
	remarkPlugins: [math],
	rehypePlugins: [katex],
	async sidebarItemsGenerator({ docs }) {
		return docs
			.sort(
				(a, b) => b.sidebarPosition - a.sidebarPosition
			)
			.map((item) => {
				if (!item.frontMatter.title)
					item["label"] = insert_spacing(item.id);
				item["type"] = "doc";
				return item;
			});
	},
},
```



另外，如何加上一个自己的文档呢，比如说目前有`docs` `blog`，我想加上一个`docs1`

这就要在`plugin`中新增一项，这其实和`preset`中的`docs`是一个意思，但是`preset`中只能配置一个`docs`。

```js
plugins: [
	[
		"@docusaurus/plugin-content-docs",
		{
			id: "solutions",
			path: "solutions",
			routeBasePath: "solutions",
			remarkPlugins: [math],
			rehypePlugins: [katex],
			sidebarPath: require.resolve("./sidebars.js"),
			async sidebarItemsGenerator({ docs }) {
				return docs.map((doc) => {
					return {
						type: "doc",
						id: doc.id,
						label: `${doc.sidebarPosition} - ${doc.id}`,
					};
				});
			},
		},
	],
],
```

其中的`label`项是因为我想实现`1 - 两数之和`这样子的侧边栏显示效果。因为Docusaurus会自动将`1-两数之和.md`的数字前缀识别为`position`并省略掉，但是我不想省略。



