之前因为氢 11 存在各种问题，刷机回到了安卓 Q，又因为安卓 Q 稳定版没有一些功能，决定切到公测版，这里的切换就直接卡死了，也没有 TWRP，只能 9008 救回来。

这里简单做一下总结。其实总结已经做了很多次了，我的笔记本上有当年写的`刷机总结1.0.txt`、`刷机总结2.0.txt`、`刷机总结3.0.txt`。那可以把这一篇作为`4.0`。

## 降级版本

降级版本是很简单的，只需要到一加论坛下载降级包，然后直接用系统设置里面的本地升级刷入。有安卓 11、安卓 10、安卓 9 的降级包，但是每一个都会抹除所有数据，所以必须先做好数据备份。

### 数据备份

数据备份有很多种选择。

-   首先，照片和视频肯定得自己备份。我是传到了电脑，并且弄了个移动硬盘存着。
-   其次，微信和 QQ 的数据，以及一些密码和日记什么的，建议不要用微信、QQ 自带的备份，这些东西缓慢、难用且无压缩。建议使用钛备份，以及现在的 Alpha Backup 什么的，如果手机自带的备份软件能备份完整的也好。
-   手机备份软件的缺点在于，如果你换了手机，那么它是无法在不同品牌手机上恢复软件数据的。不过如果是刷机就无所谓。电话、短信等最好用自带的云备份，恢复也更为迅速。
-   其余的应用，一般是无需备份的。这里可以用 TWRP 自带的整个 data 分区的备份，打包个上百 G，然后一键恢复。但是这会占据很多内存，所以建议用酷安的备份单存下自己的应用清单，刷机之后按需安装。

## 9008

如果整个手机已经无法开机，并且没有自带 TWRP 的话，那就大概只能 9008 了。

这里主要参考了一加论坛的[救砖教程](http://www.oneplusbbs.com/thread-4446250-1.html)。原理是，9008 模式连接电脑，用售后提供的刷机软件和救砖包来刷机。

首先下载救砖包和刷机驱动。据说如果之前有别的刷机驱动，需要卸载干净安装一加 7Pro 的刷机驱动。

救砖包解压之后，得到如下文件

```
build_path.txt
guacamole_21_H.04_190416.ops
md5sum_pack.md5
MsmDownloadTool V4.0.exe
rev_China_190416_2308_release_OTA-BLOCK_Signed_fp1904162308_cve2019-03-01_ufs_Hydrogen-OS-9.5.GM21
```

点击`MsmDownloadTool`，打开刷机工具。

![image-20220108225904612](https://gitee.com/fetiss/img_clound/raw/master/img/2022/01/08/33951_image-20220108225904612.png)

接着点击校验来检测刷机包是否损坏。然后使用 Enum 检测端口，我这里就扫描出来一个`COM3`口。

手机完全关机之后（最简单的完全关机方法是进入 fastboot 里面点击关机），按住上下音量键连接电脑，再 Enum 就能找到手机。

点击 Start 来刷机，等待进度跑到 100%即可。

![image-20220108230250018](https://gitee.com/fetiss/img_clound/raw/master/img/2022/01/08/85065_image-20220108230250018.png)

然后开机就行。等待一会，它会卡在开机界面，但是按一下音量上和电源键就能进去系统。

<img src="https://gitee.com/fetiss/img_clound/raw/master/img/2022/01/08/61747_Screenshot_20180101-000345.jpg" alt="Screenshot_20180101-000345" height="500" />

这里可以看到系统是安卓 9，出厂包是这样的。发现很神奇的一点，出厂时候的安卓默认切换动画居然是上下切换，挺好看的！

然后我就直接用内置的升级，升到了安卓 10 的公测 Beta17。

<img src="https://gitee.com/fetiss/img_clound/raw/master/img/2022/01/08/36419_image-20220108232148287.png" alt="image-20220108232148287" height="500" />

这里手机的状态是没解锁 BL 锁，当然也没有`twrp`、`magisk`这些东西。

接下来就是刷入它们。其实`twrp`是没有什么必要刷入的，但是它是刷入`magisk`的两大途径之一。

另外一种刷`magisk`的方法是，先提取刷机包里面的`boot.img`，然后用`magisk manager`来修补它，最后在 adb 中刷入这个`img`。

不过，一加刷机包并没有那么容易提取`img`，并且提取是需要`python`环境，而我刚好卸载掉了。

刷`twrp`也是很简单的，但是必须要有对应的`twrp`包。

我自个的`twrp`包是论坛找的，安卓 10 能用，但是更高版本就不知道了。

不仅如此，还需要一个 adb 环境，论坛也有提供，反正啥都有就行了。

首先解锁`bootloader`，进入`fastboot`之后，使用`fastboot oem unlock`指令。

首先进入`fastboot`，这里讲一下怎么关机进入`fastboot`。

-   音量上+开机键：短按关机长按重启
-   音量下+开机键：recover 模式，或者是 twrp
-   音量上下＋开机键：fastboot 模式

进入之后数据线连接电脑，在 adb 文件夹中打开终端。

首先传一个暂时的`twrp`包：

```
fastboot boot twrp-(2).img
```

接着进入`twrp`，在`sideload`里面，继续刷入一个`twrp`

```
adb sideload twrp-3.3.1-x-guacamole-unified-installed.zip
```

这里就刷好了`twrp`。然后开机再关机，虽然不知道这一步有没有必要，但是还是尊重一下流程。

然后刷入`magisk`，这里很简单了，复制一个`Magisk-v23.0.zip`到内存，然后`twrp`刷入即可。

开机之后装上`manager`就好了。

## 其他的注意事项

当然也要安装一些有的没的，不然为什么要弄面具呢。

首先是如何刷机之后保留`magisk`：安装完刷机包之后，不要重启，直接打开`manager`然后点击安装，安装到另一个分区。

其次是刷`Riru`，这里最好用`搞机助手R`来弄，不需要到 github 上面一个一个找。

依次安装如下模块：

```
riru-core
riru-enhance mode for storage isolation # 存储空间隔离
riru-lsposed # xposed
```

然后`lsposed`里面安装一些模块

```
哔哩漫游
知了
核心破解
一加拓展xp # 勾选系统界面
指纹支付
```

用`一加全能盒子`可以禁止系统升级，不再弹出烦人的升级提示。

---

最后附带一下以前的一些刷机记录总结

```
// 19年6月
adb reboot bootloader
fastboot boot magisk_patched.img

运行解锁工具
进入面具 自动升级
重启
升级最新面具
重启
刷入riru和edxposed
重启
刷入字体包
重启


没了 重点是不要用普通的xposed install  要用edxposed的
```

```
// 19年10月
当你没有magisk或者twrp,
首先去官网下载这俩个的卡刷包，在安卓q上要求twrp大于某个版本，magisk当然也是。
fastboot里面用cmd输入fastboot boot xxx.img来刷入twrp，注意选对版本不然会卡在fastboot界面。
进twrp之后，用adbsideload或者直接卡刷刷入twrp卡刷包，之前刷入的是临时的。
其次在twrp里面刷入magisk卡刷包。这里我试过刷入石沉大海，或者无法开机，都是玄学问题，需要双清解决。

另外一个办法，用magisk修补系统的boot.img之后生成一个文件，在twrp卡刷该文件。不过我没有成功。
还有，有人说o升q时候可以保留magisk，我不敢。
还有，安卓o升p时候必须卸掉存储重定向模块，否则无法开机。

twrp可以访问data/adb文件夹，下面是magisk模块。

下面说说装别的。
字体包直接在面具刷入。
存储重定向要先刷入riru-core，然后刷存储重定向。
edxposed也是如此，听说edx还不是很支持安卓q，需要用magisk19.4，但我没遇到这种情况。
magisk里面也可以刷入twrp，但我没试过。

牢记，在每一次升级系统（ota）之前，必须用magisk的刷入到另一分区，不然绝对掉magisk。

twrp刷入面具卸载包可以删除面具，但是可能造成以后刷magisk石沉大海，但这是玄学问题，我也不明白。

如果一切都不行就9008吧。
```

```
// 20年5月
1. 脑残地刷入了perfectcolorbar  这个垃圾插件会导致安卓9以上系统直接卡死。
2. 我在fastboot里面刷入了twrp-3.3.1-3-guacamole.img，这个直接导致卡在fastboot页面。
很奇怪，无论是官网下载的还是我自己的，只要是3.3.1-3都没用。
3. 一些奇怪的代码是没有用的，比如在fastboot里面切换分区，之类的。
4. 非常神奇的是用了第三方的twrp，所有问题马上得到了解决。【论坛开发者的第三方twrp】这个文件夹里面的两个twrp都有用，虽然看起来不是出自一个人之手。
5. 代码是先进入fastboot，然后fastboot boot twrp-(2).img，进入rev之后adb sideload，用的是adb sideload twrp-3.3.1-x-guacamole-unified-installer.zip。接着就可以自如开机，虽然会掉magisk。
6. magisk直接在twrp里面刷卡刷包即可。

谨记： 永远不要再试图安装【perfectcolorbar】！！！

这里提供一个没有mm管理器的方法

此方法适应于你舍不得自己安装的magisk模块
在twrp里的终端
，切换目录到那个文件夹，命令"cd /cache"（A-Only）或是"cd /data/cache"（A/B分区）。空格！
由于本身就是root的关系，可以直接用命令创建文件"touch .disable_magisk"即可。

有时候会出现不能用fastboot指令，必须先用adb devices来连接设备
```
