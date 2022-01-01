假设本地并行开发`main`和`dev`俩分支

![image-20211229172305208](https://gitee.com/fetiss/img_clound/raw/master/img/2021/12/29/79872_image-20211229172305208.png)

现在用`rebase`来创建线性的提交记录。

1. 切换到`dev`，然后`git rebase main`，这就是说在`main`分支增加一个新的节点，并且该节点是合并了`dev`和`main`的。而且，现在`dev`指向这个节点。

   ![image-20211229173652696](https://gitee.com/fetiss/img_clound/raw/master/img/2021/12/29/54772_image-20211229173652696.png)

2. 现在想让`main`也指向最新，那就是回到`main`分支，执行`git rebase dev`，这一步是让`main`以`dev`为基，那么`git`给出的最终结果是`main`也指向了最新的节点。

   ![image-20211229174442039](https://gitee.com/fetiss/img_clound/raw/master/img/2021/12/29/13894_image-20211229174442039.png)