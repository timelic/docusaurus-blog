自从两天之前，当我`git push`的时候，就会出现这种提示

```
fatal: unable to access 'https://hub.fastgit.org/timelic/docusaurus-blog.git/': OpenSSL SSL_connect: Connection was reset in connection to hub.fastgit.org:443
```

我本地是用了 [FastGit](https://doc.fastgit.org/) 来做 Github 代理，所以可能是它坏掉了。

怎么取消这个代理呢，首先`控制面板\网络和 Internet\Internet 选项\连接`中的局域网设置，取消代理。

其次要设置 `git` 本身的代理，`git config --global --edit`命令会在编辑器中打开一个配置文件，删除代理相关之后保存。



最后使用某些代理或者`DevSidecar`来直接推到 Github。现在就可以推且不会 443 了。



还有一个问题， [FastGit](https://doc.fastgit.org/) 到底是不是坏掉了，我尝试设置`fastgit`代理发现它确实不能用，但是用官网的检测却没发现什么问题。官网给出的解决方案是

+ 请确认你的网络以及 DNS 工作正常
+ 请查阅 [https://status.fastgit.org (opens new window)](https://status.fastgit.org/)以及 [https://github.com/FastGitORG/uptime (opens new window)](https://github.com/FastGitORG/uptime)以确认 FastGit 是否正面临潜在的服务不可用可能性
+ 更换阿里公共 DNS 避免潜在的 DNS 污染问题
+ 通过 Tcpping 尝试与 FastGit IP 进行通信

试着用了`tcping`来测试 443 端口，发现是能通的。官网提供的状态检测也是可以的，反正这就很让人迷惑..只能说暂时不用它了。