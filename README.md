# vfis

这个项目是把fis一些基础但是必须的功能结合到一齐的工具集。部分功能存在一些规则，具体请看下文的说明。工具集包含功能有：

- [x] 支持vue
- [x] 支持sass
- [x] autoprefixer兼容css
- [x] babel兼容es6
- [x] js依赖及引入
- [x] 按需合并文件
- [x] 图片合并
- [x] 图片压缩

## 说明
此项目把部分功能进行了简单封装，只需简单修改配置就可以使用。其他配置细节未公开，如果对你影响比较大的可以写到issue，我会持续完善。

- 安装及使用
- 输出设置
- 模块化
- 文件合并
    - 图片合并
- 数据模拟
- 使用场景
    - 部署
    - 测试
- 使用建议
    - 目录规范
    - 资源引入
    - js合并
    - 图片合并

### 安装及使用

#### 安装
```
npm i -g vfis
```
> 由于依赖的各种库比较大，请耐心等待。

#### 使用
生成
```
vfis release -d ./output
```

生成并监控
```
vfis release -wL ./output
```

预览
```
vfis server start --root ./output
```

> 更多使用移步到 [fis3 起步构建](http://fis.baidu.com/fis3/docs/beginning/release.html)


#### 输出设置

默认设置
```
fis.set('vfis.config', {
    input: '**/(*.html)',       //访问的文件入口
    output: {                   //输出文件目录及相关的设置
        default: {
            basePath: 'assets', //静态资源目录
            pagePath: '',       //页面生成目录
            url: '',            //静态资源访问的虚拟目录（指虚拟目录路径）
            domain: '',         //静态资源访问的域（指网站访问域，如：http://uxfeel.com）
        }
    }
})
```

**开发目录**
```
- src/
  - imgs/
  - index.html
  - main.js
  - main.scss
- fis-conf.js
```

**生成目录**
```
- assets/
  - src/
    - imgs/
    - main.js
    - main.scss
- index.html
```

#### 模块化
模块化使用的是`fis3-hook-commonjs`与`fis3-hook-node_modules`
目前模块使用`npm`安装，并可直接引用使用。例：

##### 使用
```
# 安装vue
$ npm i -D vue

# main.js
const vue = require('vue');

# or main.es6
import vue from 'vue';
```

如出现*警告*提示缺少模块，请把缺失安装上就可以了。

##### 自定义包访问别名
只对js、css有效
```
# 目录`src/import`是需要直接访问时

fis.set('vfis.config', {
    modules: {
        paths: {
            'import': 'src/import'
        }
    }
});
```

##### 自定义包信息
提供给需要手动设置的包，如以下例子：
```
# fis-conf.js
fis.set('vfis.config', {
    modules: {
        packages: [{
            name: 'user',
            location: 'src/user',
            main: 'info.js'
        }]
    }
});

# main.js
var userInfo = require('user');
```

##### 自定义依赖和暴露内容

```
# fis-conf.js
fis.set('vfis.config', {
    shim: {
        deps: ['jquery'],                                     //依赖
        exports: 'modal',                                     //暴露的对象名字
        init: 'function($) {return $.extend({a: 1}, {b: 2})}' //暴露的可以通过自定的方法来控制。
    }
});
```

#### 文件合并
能合并的文件有三类：js、css、图片，js及css合并单一文件有点过于暴力，这里提供自选文件合并方式，如：
```
fis.set('vfis.config', {
    package: {
        vendor: {
            //key为合并后文件名字，value为需合并的文件的glob
            'libs.js': ['node_modules/**'],
            'pages.js': ['pages/**']
        }
    }
)
```

##### 图片合并

而图片合并指的是合并为雪碧图，vfis将同一个css文件下标有`__sprite`的图片合并到同一张雪碧图中。
```
# .icons
/** 在css中你需要的图片后面加上`__sprite` */
.icons{
    display: inline-block;
    width: 36px;
    height: 36px;
    background-repeat: no-repeat;
    background-size: 36px;

    &.icon-phone{
        background-image: url('./imgs/icons/phone.png?__sprite');
    }
    &.icon-user{
        background-image: url('./imgs/icons/user.png?__sprite');
    }
    &.icon-code{
        background-image: url('./imgs/icons/code.png?__sprite');
    }
    &.icon-invitaion{
        background-image: url('./imgs/icons/invitaion.png?__sprite');
    }
}

# vfis release
/assets/icons.css   //icon样式
/assets/icons_z.png //icon雪碧图
```

#### 数据模拟
模仿数据接口需要在mock目录下添加相关配置，如下：

在mock文件夹内添加`server.conf`路由配置及模拟数据文件`task.list.js`，生成后访问`http://127.0.0.1/api/tasks`就会获得你需要的模拟数据了。
```
# mock/server.conf
//rewrite [正则路由] [对应路由文件]
rewrite ^\/api\/tasks$ /mock/task.list.js

# mock/task.list.js
//类似express的处理
module.exports = function(req, res, next) {
    res.end(JSON.stringify({
        [
            {
                id: 1,
                title: "这是一个任务",
                description: "",
                complete: false,
                tags: [],
                createAt: 1467275476779,
                updateAt: null,
                deleteAt: null
            },
            ...
        ]
    }));
};
```

#### 使用场景


## 运行环境
```
node 4.4.x
npm 3.10.x
python 2.7.x

win系统还需 Microsoft Visual Studio 2010以上
linux系统需要 c++运行环境
```

### 环境安装细节
win下需要管理者权限
```
# 更新npm
sudo npm update -g npm

# 安装fis3
sudo npm install -g fis3
```

### 安装依赖
命令行进入项目目录根
```
npm i
```

### 安装其他问题
假如运行出错，或很久不动，可能是node-sass安装问题，使用`ctrl+c`停止命令，然后重装。
```
npm rebuild node-sass
```
