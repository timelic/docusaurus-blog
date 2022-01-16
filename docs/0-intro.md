---
sidebar_position: 0
title: 创建 Docusaurus 博客
---

首先利用命令`npx create-docusaurus@latest [name] [template]`来创建项目。

接着就会得到这样子的文件结构。

```
my-website
├── blog	博客文章
│   ├── 2019-05-28-hola.md
│   ├── 2019-05-29-hello-world.md
│   └── 2020-05-30-welcome.md
├── docs	普通文章
│   ├── doc1.md
│   ├── doc2.md
│   ├── doc3.md
│   └── mdx.md
├── src
│   ├── css
│   │   └── custom.css	自定义css
│   └── pages
│       ├── styles.module.css
│       └── index.js	react的博客首页
├── static
│   └── img
├── docusaurus.config.js	修改主题、页头、侧边栏、页脚之类的
├── package.json
├── README.md
├── sidebars.js
└── yarn.lock
```

### Docusaurus 的命令

-   `docusaurus start [siteDir]`启动服务器
-   `docusaurus build [siteDir]` 构建生产版本
-   `docusaurus swizzle [siteDir]` 覆盖主题
-   `docusaurus deploy [siteDir]`
-   `docusaurus serve [siteDir]`为构建后的网站启动 web 服务器。
-   `docusaurus clear [siteDir]`清除 Docusaurus 站点在构建时生成的静态资源、缓存、副产品。
-   `docusaurus write-translations [siteDir]`将需要翻译的内容写入 JSON 文件中。
-   `docusaurus write-heading-ids [siteDir] [files]`为 Markdown 文档中的标题显式地添加 id。

#### 服务器配置

用在`start`命令

| `--port`                      | `3000`      | 指定开发服务器监听的端口。                                                                                                                                                                            |
| ----------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--host`                      | `localhost` | 指定要使用的主机。例如，如果希望服务器可以从外部访问，则可以使用 `--host 0.0.0.0`。                                                                                                                   |
| `--hot-only`                  | `false`     | 在构建失败的情况下，启用热模块替换而不进行页面刷新的方式作为后备。更多信息请见 [这里](https://webpack.js.org/configuration/dev-server/#devserverhotonly)。                                            |
| `--no-open`                   | `false`     | 不要在浏览器中自动打开页面。                                                                                                                                                                          |
| `--config`                    | `undefined` | 指向 docusaurus 配置文件的路径，默认为 `[siteDir]/docusaurus.config.js`                                                                                                                               |
| `--poll [optionalIntervalMs]` | `false`     | 在文件监视（watching）功能不能工作的环境中，使用文件轮询（polling）而不是监视（watching）的功能实现实时重新加载。 更多信息请见 [这里](https://webpack.js.org/configuration/watch/#watchoptionspoll)。 |
