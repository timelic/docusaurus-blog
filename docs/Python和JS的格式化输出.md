## Python

```c++
print("My name is %s and weight is %d kg!" % ('Zara', 21))
print('My name is {name}, and weight is {weight}'.format(name='John',
                                                         weight=11))
```

```python
print(f'cost time is {cost_time}')
```

## JS

```javascript
console.log("s测试： %s-%s-%s-%s", "wuyujin", 1997, 123.456, {name:"aaa",age:22});

console.log("d和f测试： %d-%f", 1997, 123.456);

var obj = {name:"aaa", age:22, contact: {qq:123,wechat:"asd",tel:123456}};
console.log("o测试： %o %O", obj, obj);

var str = "%c hello %c world";
var arg1 = "color: #fadfa3; background: #030307; padding:5px 0;";
var arg2 = "background: pink; padding:5px 0;";
console.log(str, arg1, arg2);

```

### 模板字符串

```javascript
$("#result").append(
`He is <b>${person.name}</b>and we wish to know his${person.age}.that is all`
);
```

> 注意是`${}`

