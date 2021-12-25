当你的项目有多个remote，比如说`origin`, `github`, `gitee`

可以用这行代码来一次推送到所有远程

```bash
git remote | xargs -L1 git push --all
```

或者单独推送一个分支

```bash
git remote | xargs -L1 -I R git push R master
```

另外，单独在`git`中设置一个别名，是更好的方法

```bash
git config --global alias.pushall '!git remote | xargs -L1 git push --all'
```



也可以在`package.json`中单独写一个命令

```json
"scripts": {
    "pushall": "git pushall"
  },
```

