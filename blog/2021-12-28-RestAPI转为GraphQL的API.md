---
tags: [GraphQL]
---

实际上是把 RestAPI 作为 GraphQL 的数据源。官网的例子太复杂了，不适合初学者。而这篇[博文](https://codeburst.io/how-to-implement-a-graphql-api-on-top-of-an-existing-rest-api-db8b343ddb5a)就写得很好，阐明了如何创建 RestAPI 到转化为 GraphQL。

<!--truncate-->

### 创建 RestAPI

仓库在[这](https://github.com/thawkin3/dad-joke-dadabase-rest-api)

这里其实很简单，使用了`jsonServer`库，将一个`Json`的文件映射到路由上。

```js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(process.env.PORT || 3000, () => {
	console.log(
		`🚀 JSON Server is running on port ${process.env.PORT || 3000}`
	);
});
```

现在有这两个路由地址

```
http://localhost:3000/jokes
http://localhost:3000/ratings
```

甚至支持增删查改。

### 转为 GraphQL

仓库在[这](https://github.com/thawkin3/dad-joke-dadabase)

#### 类型定义

```js
const typeDefs = gql`
	type Joke {
		id: Int!
		content: String!
		ratings: [Rating]
	}

	type Rating {
		id: Int!
		jokeId: Int!
		score: Int!
	}

	type Query {
		joke(id: Int!): Joke
		jokes: [Joke]
		rating(id: Int!): Rating
		ratings: [Rating]
	}

	type Mutation {
		rating(jokeId: Int!, score: Int!): Rating
	}
`;
```

这里值得看的是`Mutation`，但是我还没弄懂这里。

#### 数据源

```js
class JokesAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = "http://localhost:3000/";
	}

	async getJoke(id) {
		return this.get(`jokes/${id}?_embed=ratings`);
	}

	async getJokes() {
		return this.get("jokes?_embed=ratings");
	}

	async postJoke(jokeContent) {
		return this.post("jokes", jokeContent);
	}

	async replaceJoke(joke) {
		return this.put("jokes", joke);
	}

	async updateJoke(joke) {
		return this.patch("jokes", { id: joke.id, joke });
	}

	async deleteJoke(id) {
		return this.delete(`jokes/${id}`);
	}
}
```

利用`apollo-datasource-rest`库，将 RestAPI 增删查改转为 JokesAPI 类的方法。

#### 解析器 Resolver

```js
const resolvers = {
	Query: {
		joke: async (_source, { id }, { dataSources }) =>
			dataSources.jokesAPI.getJoke(id),
		jokes: async (_source, _args, { dataSources }) =>
			dataSources.jokesAPI.getJokes(),
		rating: async (_source, { id }, { dataSources }) =>
			dataSources.ratingsAPI.getRating(id),
		ratings: async (_source, _args, { dataSources }) =>
			dataSources.ratingsAPI.getRatings(),
	},
	Mutation: {
		rating: async (_source, { jokeId, score }, { dataSources }) => {
			const rating = await dataSources.ratingsAPI.postRating({
				jokeId,
				score,
			});
			return rating;
		},
	},
};
```

`Query`中定义的是四种能查询的数据，注意到这些数据都是来自数据源`JokesAPI`和`ratingsAPI`的。

获取数据的过程：当使用`gql`语句获取数据的时候，首先用解析器来解析。解析器下面的`Query`中是四种能解析的数据，而这四种能解析的数据的格式，由`typeDefs`中的`Query`来定义。实际上要获取的数据，是通过`JokesAPI`和`ratingsAPI`来拿到的，拿到的数据当然也符合定义。

### 启动服务器

先说启动最简单的服务器`apollo-server`。

首先导入并且生成实例：

```js
const { ApolloServer } = require("apollo-server");
const apollo_server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		jokesAPI: new JokesAPI(),
		ratingsAPI: new RatingsAPI(),
	}),
});
```

然后启动这个服务器

```js
apollo_server.listen(5000).then(() => {
	console.log(`
    Server is running!
    Listening on http://localhost:5000
    Explore at https://studio.apollographql.com/sandbox
  `);
});
```

接着打开 apollo 的沙盒来预览

![image-20211228154906524](https://gitee.com/fetiss/img_clound/raw/master/img/2021/12/28/43533_image-20211228154906524.png)

注意到这里`query`下面根查询的两个对象，一个是`jokes`一个是`joke`，都是直接在`typeDefs`中的`Query`中定义的。

并且它还能使用一些变量，譬如上面的`$jokeId$`，这个变量的赋值可以在左下角中看到。

前端的话按照[这](/blog/vue+graphql)来配置即可，然后就能拿到对应的数据。

注意`apollo-server`库对应`@apollo/client/core`，而`apollo-server-express`库的作用是把`GraphQL` 再变成`RestAPI`发出去，这就让人难以捉摸。
