### 网址二维码生成器

把 `qrcode.min.js` 的内容放进Chrome书签应该就可以了

> 在Github等有CSP(内容安全策略)相关限制的网站，以上方法可能会失败

![CSP](https://static.hellflame.net/resource/884567815af6762137aefc95efc5b07b)

#### 其他细节

* 在浏览器获取二维码之后默认会在localStorage保存，平均每个二维码有1k大，每个域名下最多保存最近获取的20个二维码

* 缓存超过20的部分通过LRU进行淘汰

* `qrcode.min.js` 通过 uglifyjs 压缩

* 二维码会在当前页面置顶，页面滚动到最开始，再次点击书签，二维码消失，样式按照 `margin:0 auto;display:block;z-index:9999999;position:relative;width:auto;max-height: + r_h + px` 生成

* 由于关系到个人隐私，二维码生成最好使用自己信任的服务或自己独立部署，`qrcode.min.js` 中默认使用 `https://static.hellflame.net/qrcode/generator` 作为后端接口

* 由于浏览器安全策略问题，`https` 网站默认会限制 `http` 内容的加载，所以后端最好加上 `https`

* 关于这里用到的`hash`中移位截断的[说明](https://www.hellflame.net/article/louKs)

* 可以处理的 `URL` 的长度限制来自于浏览器对于URL长度的限制，如果有炒鸡长的链接的需求的话，可以使用 `短链服务`

