新建仓库`git init`。

创建一个文件`index.js`并且提交到本地。

现在的分支是`master`分支，创建一个新的`dev-login`分支：`git branch dev-login`。

> 用`git branch`可以查看现有的分支

然后切换到`dev-login`分支开发登录功能：`git checkout dev-login`

> 创建并切换可以用一条命令`git checkout -b dev-login`

接着`git checkout master`切换到主分支，`git checkout -b dev-register`切换到`register`分支来开发注册功能。

然后再切回主分支，合并`git merge dev-login`，把登录分支合并到主分支。

这时候可能出现无法合并，会让你手动合并之后再提交到本地。直到你提交到本地之后，才会算一次合并成功。

对注册分支如法炮制。

最后删除两个`dev`分支：`git branch -d dev-login dev-register`