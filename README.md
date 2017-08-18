# vue版网易云音乐

> api：ap使用的是一个开源的nodejs封装的网易云音乐api，[地址](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e5%ae%89%e8%a3%85)

> [预览地址](http://39.108.14.248/music)（国外的服务器，估计有点慢）

## 使用步骤

``` bash
# 下载
git clone git@github.com:tgxhx/vue-music.git

# 安装依赖
npm install

# 运行开发环境
npm run dev

# 构建生产环境
npm run build

```

## 技术栈
 + vue2：基础框架
 + vue-router2：路由跳转
 + vuex：全局数据管理
 + es6：采用部分es6特性，大大简化了写法
 + webpack：vue-cli基于webpack，修改了部分配置
 + axios：基于Promise的http库，用来请求数据
 + scss：写起css来十分方便，需要安装sass-loader，另外使用自定义其中的自定义函数配合rem来适配移动端设备简直不要太方便
 + flex：弹性布局，在移动端兼容性较好，写各种布局非常方便
 + [vue-material](https://github.com/vuematerial/vue-material)：一个Android上material design风格的组件库

## 说明
1. 这个项目大小组件大概二十几个，目前还未完工，以后还会继续更新，目标是还原整个网易云音乐（虽然不知道什么时候能填完坑o(╯□╰)o）。
2. 关于路由，刚开始设计路由的时候想了很多，由于一开始的目标就是网易云音乐的所有内容，所以设计了三级路由，/root/index/recommed，大概这样，[点击查看](https://github.com/tgxhx/vue-music/blob/e43c4975e42b93b6ccf5d8609687879a589d4d8f/src/router/index.js)。
3. 关于体会，写到这个项目也算是对vue全家桶比较熟了，体会就是，不论是简单的复杂的项目，只要分割成一个个组件再拼起来，也没什么难的，组件之间通信又有vuex，也是非常简单的，总之就是熟能生巧。
4. 关于难点，对于自己来说，audio标签以前没有接触过，有点麻烦，不过还算有[相关文档](http://caibaojian.com/html5-audio.html)；歌词滚动，参考[这里](http://www.brafox.com/post/2015/HTML5/js%E8%A7%A3%E6%9E%90lrc%E6%AD%8C%E8%AF%8D-%E5%88%B6%E4%BD%9C%E6%BB%9A%E5%8A%A8%E6%AD%8C%E8%AF%8D.html)，部分歌曲还是有点问题，待解决;播放器背景图，这个当时考虑了很久，因为网易云音乐的播放器背景图就是当前歌曲的专辑图，还是模糊效果，最后实现方式是在当前组件的二级div设置当前歌曲的背景图，大小覆盖父元素，为防止第一次播放或者切歌的时候没有图，在组件的根元素也设置一张背景默认图，具体可以[点击查看](https://github.com/tgxhx/vue-music/blob/771218f2929de6b64a34c62597777a4fc0b6ed6e/src/components/Player.vue)；当前歌曲在播放列表中的索引获取，通过es5中数组的findIndex方法，找到当前歌曲的id在数组中的位置，具体可以[点击查看](https://github.com/tgxhx/vue-music/blob/e43c4975e42b93b6ccf5d8609687879a589d4d8f/src/components/PlayList.vue)。
5. 关于打包后的资源路径，比如要放在二级目录www.xxx.com/music，那么修改config/index.js中的assetsPublicPath: '/music/'即可。
6. 关于移动设备适配，我使用的是js动态设置html元素font-size的方式，页面元素使用rem，这样可达到在不同设备下显示内容基本一样的效果，具体可以[点击](https://segmentfault.com/a/1190000008721148)，使用方式比如width:100px;可以写成width:pr(100)。
7. 关于图标，使用的是淘宝的iconfont字体图标方案，相比于使用图片图标有许多优势，比如任意缩放、改变颜色、响应式适配设备等等，具体可以参考[这篇文章](https://www.w3cplus.com/css3/icon-fonts.html)。


## 功能
- [x] 首页歌单推荐
- [x] 歌单详情
- [x] 播放器
- [x] 播放暂停
- [x] 播放模式切歌（顺序和随机）
- [ ] 歌词滚动（待修改）
- [x] 歌曲拖动
- [x] 播放器底部背景
- [x] 播放底栏
- [x] 底栏歌词同步
- [x] 播放列表
- [x] 歌曲评论
- [x] 搜索推荐
- [x] 搜索分类

## 部分截图
![](http://wx4.sinaimg.cn/large/7b9a6229ly1fhwlyxi2mrj20ad0icn43.jpg)![](http://wx4.sinaimg.cn/large/7b9a6229ly1fhwlz0lmr2j20ac0idmzv.jpg)
![](http://wx2.sinaimg.cn/large/7b9a6229ly1fhwlz4rv98j20ac0ic78c.jpg)![](http://wx1.sinaimg.cn/mw690/7b9a6229ly1fhwlz76gf8j20ac0idq4u.jpg)
![](http://wx1.sinaimg.cn/mw690/7b9a6229ly1fhwlzckmt6j20ac0idtdf.jpg)![](http://wx2.sinaimg.cn/mw690/7b9a6229ly1fhwlzevul9j20ac0ic76k.jpg)
![](http://wx3.sinaimg.cn/mw690/7b9a6229ly1fhwlzgb1uvj20ad0id0tp.jpg)![](http://wx1.sinaimg.cn/mw690/7b9a6229ly1fhwlzlcu5ej20ac0idq6w.jpg)
