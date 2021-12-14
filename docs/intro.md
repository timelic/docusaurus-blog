---
sidebar_position: 1
---

# MongoDB

首先安装`mongodb`库

```
npm install mongodb --save
```

新建文件夹`config`，文件`mongoDbConnection.js`

```js
const MongoClient = require("mongodb").MongoClient; //创建数据库

const url = "mongodb://localhost:27017";
const dbName = "myblog"; //数据库名字
let _db = null; //存放mangodb返回的数据库实例
```

创建一个异步函数，返回数据库实例

```js
async function connectDb() {
	if (!_db) {
		try {
			// 如果没有实例就创建一个
			const client = new MongoClient(url, { useUnifiedTopology: true });
			await client.connect();
			_db = await client.db(dbName);
		} catch (error) {
			throw "连接到数据库出错";
		}
	}
	return _db;
}
```

导出一个函数，接受名字并返回`collection`

> 在 mongodb 中，**collection 相当于关系型数据库的表，但并不需提前创建，更不需要预先定义字段**

```js
// 返回一个collection
exports.getCollection = (collection) => {
	let _col = null;
	return async () => {
		if (!_col) {
			try {
				const db = await connectDb();
				_col = await db.collection(collection);
			} catch (error) {
				throw "选择 collection 出错";
			}
		}
		return _col;
	};
};
```

接下来要创建 model

创建`model/post.js`

```js
// 创建 一个post的collection
const postCollection = require("../config/mongoDbConnection").getCollection(
	"postCollection"
);
```

保存文章

```js
exports.save = async (post) => {
	try {
		const col = await postCollection();
		const result = await col.insertOne(post);
		return result.ops && result.ops[0];
	} catch (error) {
		throw "添加文章到数据库出错";
	}
};
```

在路由里面监听

```js
route.post("/", async (req, res) => {
	try {
		// 存放数据到数据库
		const newPost = await postModel.save(req.body);
		res.status(201).json(newPost); // 发送状态码201, json返回n
	} catch (error) {
		console.error(error);
		res.status(500).send();
	}
});
```
