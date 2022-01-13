安装`pip package`时候出错

```
pip install autopep8
```

报错为

```
pip is configured with locations that require TLS/SSL, however the ssl module in Python is not available
```



搜索了很多解决方法，最常见的是换源，换成淘宝源、清华源什么的。

另一种办法是安装`winssl32`这个软件，但一般来说它是内置的，所以安装它也没什么作用。

在`stackoverflow`上搜到的解决办法是，首先添加`conda`到系统路径

```
D:\Anaconda3 
D:\Anaconda3\Scripts
D:\Anaconda3\Library\bin 
```

然后最神奇的一步是这样子的：

> Specifically, I copied the following files from `C:\Users\MyUser\Miniconda3\Library\bin` to `C:\Users\MyUser\Miniconda3\DLLs`:
>
> - libcrypto-1_1-x64.dll
> - libcrypto-1_1-x64.pdb
> - libssl-1_1-x64.dll
> - libssl-1_1-x64.pdb

结论就是，这大概是`conda`自己的`bug`。