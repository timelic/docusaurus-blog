![image-20220101205155689](https://gitee.com/fetiss/img_clound/raw/master/img/2022/01/01/79234_image-20220101205155689.png)

### 最基本的拖拽上传

首先你得有一个框来捕获文件

```vue
<div id="drag-area" ref="dragArea">Drag your files into this box.</div>
```

接着在Vue中准备一个响应式来获取这个元素，这里用组合式API作为示例

```js
import { ref, onMounted } from "vue";
const dragArea = ref();
```

然后需要在`onMounted`中获取元素

```js
onMounted(() => {
  dragArea.value.ondragenter = () => false;
  dragArea.value.ondragover = () => false;
  dragArea.value.ondragleave = () => false;
  dragArea.value.ondrop = (e) => {
    onFileChange(e);
    return false;
  };
});
```

上面先将`ondragenter`等三个方法都绑定一个返回`false`的匿名函数，是因为要阻止冒泡并取消默认事件。返回`false`是很方便的，但是你也可以使用如下办法

```js
dragArea.value.ondragenter = (e) => {
	e.stopPropagation() // 阻止冒泡
	e.preventDefault() // 取消默认事件
}
```

而`dragArea.value.ondrop`这里被绑定了一个方法，用来获取上传的文件。整个合成事件被送到`onFileChange`中进行处理。

这里是一个`onFileChange`的例子：

```js
const onFileChange = (e) => {
  const files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  if (!/^application\//.test(files[0].type)) {
    alert("请选择Json！");
    return;
  }
  const reader = new FileReader();
  reader.readAsText(files[0]);
  reader.onload = (e) => {
    const res = JSON.parse(e.target.result);
  };
};
```



### 带有遮罩的拖拽上传

这个遮罩的作用是，放置在页面上，使得拖拽的时候，页面其余位置变暗，从而获得更好的体验。

```html
<div id="mask" v-show="draging"></div>
<div id="drag-area" ref="dragArea">Drag your files into this box.</div>
```

重点就在于用一个`draging`变量来控制遮罩是否显示。

```js
const draging = ref(false);
onMounted(() => {
	dragArea.value.ondragenter = () => {
		draging.value = true;
		return false;
	};
	dragArea.value.ondragover = () => false;
	dragArea.value.ondragleave = () => {
		draging.value = false;
		return false;
	};
	dragArea.value.ondrop = (e) => {
		onFileChange(e);
		draging.value = false;
		return false;
	};
});
```

