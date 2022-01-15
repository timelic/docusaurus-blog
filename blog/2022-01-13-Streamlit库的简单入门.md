[Streamlit](https://github.com/streamlit/streamlit)是一个`Python`的界面库，但是制作的界面是网页形式的。并且很方便地集成了许多功能，如热重载、可视化等。

![image-20220113213402491](https://gitee.com/fetiss/img_clound/raw/master/img/2022/01/13/49494_image-20220113213402491.png)

## 简单使用

首先最简单创建一个滑动条并且实时展示滑动条数据。

<!--truncate-->

当运行的时候，要用这样子的命令

```bash
streamlit run xxx.py
```

```python
import streamlit as st

x = st.slider('Select a value')
st.write(x, 'squared is', x * x)
```

![simple_example](https://gitee.com/fetiss/img_clound/raw/master/img/2022/01/13/58345_simple_example.png)

也可以展示一些数据

```python
import streamlit as st
import pandas as pd

st.write("Here's our first attempt at using data to create a table:")
st.write(pd.DataFrame({
    'first column': [1, 2, 3, 4],
    'second column': [10, 20, 30, 40]
}))
```

这里`st.write`是一个神奇的方法，它能展示几乎一切的数据。

单独一行写一个变量，也会自动用`st.write`来渲染。

![image-20220113213716987](https://gitee.com/fetiss/img_clound/raw/master/img/2022/01/13/84830_image-20220113213716987.png)

## 状态管理

当你用`button`时候会遇到问题

```python
count = 0
def plus():
    global count
    count += 1

st.button('BTN', on_click=plus)
st.write(count)
```

这样子的代码并不会让每按一次按钮，count 加一。这是因为回调函数`on_click`会自动刷新整个页面。

所以需要用状态来保存当前的变量，下面是一个例子。

```python
st.title('Counter Example using Callbacks')
if 'count' not in st.session_state:// 声明状态变量
    st.session_state.count = 0

def increment_counter():
    st.session_state.count += 1

st.button('Increment', on_click=increment_counter)
st.write('Count = ', st.session_state.count)
```

这里感觉有点像`vue`里面的数据驱动。
