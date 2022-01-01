假设目前是这样

![image-20211229175520087](https://gitee.com/fetiss/img_clound/raw/master/img/2021/12/29/53253_image-20211229175520087.png)

目标是

+ `HEAD -> C1`
+ `main -> C6`
+ `bugFix -> C0`

首先，`Git`既然已经分离了`HEAD`，那么当前一定处于`HEAD`这个节点。

那么，直接`git checkout HEAD^`就能让`HEAD -> C1`。

接着，`bugFix -> C0`只需要`git branch -f bugFix C0`。这个命令强制让`bugFix`指向`C0`。

最后，`main -> C6`也是同理。



但是我们可以先让`bugFix -> C0`：`git switch bugFix && git checkout bugFix~3 `。

接着分离出`HEAD`：`git checkout C1`（直接checkout到某个节点，意味着分离`HEAD`。

最后，`git branch -f main C6`。