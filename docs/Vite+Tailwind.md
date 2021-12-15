首先创建 Vite 项目

```
npm init vite@latest
// 或 yarn，我这里使用的是 yarn
yarn create vite
```

安装 Tailwind

```
yarn add -D tailwindcss@latest autoprefixer@latest
```

生成 tailwind css 的配置文件

```
npx tailwindcss init -p
```

> 这时，它会在项目下生成 `tailwind.config.js` 和 `postcss.config.js` 这两个配置文件

打开 tailwind.config.js 文件，在 purge 这个配置项的数组中，加上 "./index.html"，这样在打包的时候，会自动移除 index.html 文件中，没有用到的样式：

```
purge: ["./index.html"],
```

在`main.js`里面加上

```
import "tailwindcss/tailwind.css";
```

---

在当前vue3中(21.10.20)，vue3不支持postcss8，所以不能`yarn add -D tailwindcss@latest autoprefixer@latest`

应该做的是

```
vue add tailwind 
```

