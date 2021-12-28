以下命令等价

> `–save == -S`

```
npm install module_name // 在npm5之后默认也会写入dependencies
```

```
npm install module_name --save
```

```
yarn add module_name
```

都是为了模块写入`dependencies`，它会用在开发环境和生产环境

---

以下命令等价

> `--dev == -D`

```
npm install module_name --dev
```

```
yarn add module_name --dev
```

都是为了模块写入`devDependencies`，它仅用在开发环境

---

全局安装使用`-g`，这样子就可以在终端中调用

`npm install`可以缩写为`npm i`

安装特定版本的模块

```
npm install module_name@0.1.0 //安装特定版本
npm install module_name@next //安装最新版本
```

