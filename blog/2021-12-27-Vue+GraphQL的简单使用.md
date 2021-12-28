---
slug: vue+graphql
authors: [timel]
tags: [Vue, GraphQL]
---

这里就不介绍 GraphSQL 了。

主要是以这个[仓库](https://github.com/zxuqian/code-examples/tree/master/graphql/01-intro)作为例子来介绍。

<!--truncate-->

### 前端

前端是 vue，没什么好说的。

安装依赖

```
yarn add graphql graphql-tag @apollo/client @vue/apollo-composable
```

单独创建一个`apolloClient.js`的文件，用来调用客户端。

```js
// src/apolloClient.js
import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
} from "@apollo/client/core";

const httpLink = createHttpLink({
	uri: "http://localhost:4000/graphql",
});

const cache = new InMemoryCache();

// 创建一个客户端
const apolloClient = new ApolloClient({
	link: httpLink,
	cache,
});

export default apolloClient;
```

然后导入到`main.js`中，从而可以全局调用这个客户端。

```js
// src/main.js
import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import App from "./App.vue";
import apolloClient from "./apolloClient";

createApp({
	setup() {
		provide(DefaultApolloClient, apolloClient);
	},
	render: () => h(App),
}).mount("#app");
```

在组件中利用内置的 gql 库编写 GraphQL 语句，并使用 ApolloGraphQL 提供的 `useQuery `查询 API：

```js
<script setup>
import { useQuery } from "@vue/apollo-composable";
import { gql } from "graphql-tag";

const { result, loading } = useQuery(gql`
  query AllBlogs {
    blogs {
      id
      title
      content
    }
  }
`);
</script>
```

模板中展示结果，根据 loading 值显示加载状态，根据 result 显示内容：

```vue
<template>
	<div v-if="loading">loading...</div>
	<ul v-else>
		<li v-for="blog in result.blogs" :key="blog.id">
			{{ blog.title }} - {{ blog.content }}
		</li>
	</ul>
</template>
```

### 后端

以一个运行在`node.js`上的`server.js`为例子

首先安装依赖

```
这个后面补充
```

引入`apollo-server`库

```js
const { ApolloServer, gql } = require("apollo-server");
```

定义整体的数据类型

```js
// 定义了数据类型
const typeDefs = gql`
	type Comment {
		id: ID
		comment: String
		user: String
	}

	type Blog {
		id: ID
		title: String
		content: String
		comments: [Comment]
	}

	type Query {
		blogs: [Blog]
		blog(id: ID!): Blog
	}
`;
```

假设数据直接存放在这个`js`里面

```js
// 核心数据，可以从别的后端fetch，或者是从数据库
// 但是怎么连接到数据库是一个问题 如果是从别人的restful那里fetch来 也太麻烦了
const blogs = [
	{
		id: "1",
		title: "示例博客标题1",
		content: "示例博客内容1",
		comments: [
			{ id: 1, comment: "示例评论1", user: "示例用户1" },
			{ id: 2, comment: "示例评论2", user: "示例用户2" },
			{ id: 3, comment: "示例评论3", user: "示例用户3" },
		],
	},
	{
		id: "2",
		title: "示例博客标题2",
		content: "示例博客内容2",
		comments: [],
	},
	{
		id: "3",
		title: "示例博客标题3",
		content: "示例博客内容3",
		comments: [],
	},
];
```

接下来要设置解析器，用来解析从前端传来的需求

```js
const resolvers = {
	Query: {
		// blogs 的数据来源
		blogs: () => blogs,
		// 带参数的 blog 的参数处理和数据来源
		blog: (parent, args) => {
			return blogs.find((blog) => blog.id === args.id);
		},
	},
};
```

启动服务器

```js
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
```

本地调试一下

```
hotnode server.js
```

将会启动一个本地服务器

![image-20211227112956729](https://gitee.com/fetiss/img_clound/raw/master/img/2021/12/27/16273_image-20211227112956729.png)

在中间框输入查询语句，点击`ExampleQuery`按钮，就可以在右边看到示例结果。

![image-20211227112956729](https://gitee.com/fetiss/img_clound/raw/master/img/2021/12/27/31583_image-20211227113434534.png)

左边可以同时输入多个查询语句，它会根据你的选中来判断执行的语句。

对于带参数的变量，需要像这样子来查询

```
query ExampleQuery {
  blog(id: "1") {
    id
    title
    comments {
      id
      user
      comment
    }
  }
}
```
