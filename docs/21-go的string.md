`go`的`string`有一些习惯用法，主要是看[二叉树的序列化与反序列化](https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/solution/er-cha-shu-de-xu-lie-hua-yu-fan-xu-lie-hua-by-le-2/)学到的。

也能参考[strings — 字符串操作 · Go语言标准库 (studygolang.com)](https://books.studygolang.com/The-Golang-Standard-Library-by-Example/chapter02/02.1.html)

### Builder

```go
sb := &strings.Builder{}     // 新建一个用 write 写入的 string
sb.WriteString("null,") // Builder.WriteString(string)
sb.WriteString(strconv.Itoa(node.Val.(int))) 
// 这里因为 node.val 的类型是 interface{}，断言成 int，然后 strconv.Itoa 转为 string
sb.WriteByte(',') // 写入单字节
return sb.String() // Builder 转化为 string
```

```go
sp := strings.Split(data, ",") // string 用 , 分割成 []string
val, _ := strconv.Atoi(sp[0]) // Atoi 指的是把 string 转为 int
```



### 字符串拼接

[Go 字符串拼接的 7 种姿势 - 格物 (shockerli.net)](https://shockerli.net/post/golang-concat-string/)

+ 直接`+`
+ `fmt.Sprintf`
+ `strings.Join`
+ `s = append(a, s, b)`
+ ...
