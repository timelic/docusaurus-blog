开宗明义地说，`go`中没有继承，只有组合。设计者有意用`type`来代替了`class`，前者可以实现后者的功能，同时拓展了特性，减轻了心智负担。

```go
// 定义了一个 Studeng 类型
type Student struct {
	age  int
	name string
}

// 定义了 Student 类型的一个方法，它并不是写在 type 里面
// (student *Student) 是一个接收器
func (student *Student) doSomething(newAge int) string {
	student.age = newAge
	fmt.Println(student.name)
	return student.name
}
```

> 继承是面向对象鼓吹的三大特性之一，但经过多年的实践，业界普遍认识到继承带来的弊端：
>
> - 破坏封装，子类与父类之间紧密耦合，子类依赖于父类的实现，子类缺乏独立性
> - 对扩展支持不好，往往以增加系统结构的复杂度为代价
> - 不支持动态继承。在运行时，子类无法选择不同的父类
> - 子类不能改变父类的接口
> - 对具体类的重载，重写会破会里氏替换原则
>
> golang的设计者意识到了继承的这些问题，在语言设计之初便拿掉了继承。其实也不能说golang里面没有继承，只不过继承是用匿名组合实现的，没有传统的的继承关系链(父类和子类完全是不同类型)， 同时还能重用父类的方法与成员。

一个组合的例子：

```go
type Base struct{
}

func (b Base)Show(){
   println("Bazinga!")
}

type Child struct{
	Base
}

func main() {
   child := Child{}
   child.Show()
}
```

