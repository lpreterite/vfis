# vfis

此项目把fis3部分设置进行了简化，只需简单修改设置就可以使用。其他设置细节未公开，如果对你影响比较大的可以写到issue，我会持续完善。

- 快速上手
- 模块化
- 文件合并
    - 图片合并
- 数据模拟
- 使用场景
    - 部署场景
    - 测试场景

## 快速上手

第一步，安装
```
// 全局安装fis3及常用组件
$ npm i -g babel-preset-es2015 babel-preset-es2016 babel-preset-react babel-preset-stage-3 fis-parser-babel-6.x fis-parser-node-sass fis3 fis3-hook-commonjs fis3-hook-node_modules fis3-packager-deps-pack fis3-parser-vue-component fis3-postpackager-loader fis3-postprocessor-autoprefixer fis3-preprocessor-js-require-css fis3-preprocessor-js-require-file

// 安装vfis构建优化模块
$ npm i -D vfis
```

第二步，开始使用
```
//设置
# fis-conf.js
const vfis = require('vfis');

vfis({
    input: 'src/(*.html)',
    output: {
        default:{
            basePath: 'assets'
        }
    },
    pack: {
        vendor: {
            'vender.js': ['node_modules/**'],
            'main.js': ['src/**']
        }
    }
});

// 生成并监控文件变化自动刷新页面
$ fis3 release -d ./output -wL

// 预览
$ fis3 server start --root ./output

```

第三步，理解输出设置
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

### 构建前后目录对比

构建前的**开发目录**
```
- src/
  - imgs/
  - index.html
  - main.js
  - main.scss
- fis-conf.js
```

构建后的**生成目录**
```
- assets/
  - src/
    - imgs/
    - main.js
    - main.scss
- index.html
```


## 模块化
模块化部分使用了`fis3-hook-commonjs`与`fis3-hook-node_modules`插件进行处理
使用`npm`安装模块，便可直接引用使用。例如：

### 使用
```
# 安装vue
$ npm i -D vue

# main.js
const vue = require('vue');

# or main.es6
import vue from 'vue';
```

如出现**警告**提示缺少模块，请把缺失模块安装上便可。

### 自定义包访问别名
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

### 自定义包信息
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

### 自定义依赖和暴露内容

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

## 文件合并
能合并的文件有三类：js、css、图片，js及css合并单一文件有点过于暴力，这里提供自选文件合并方式

在vendor内以key为打包后文件名字，value为需合并的文件（支持[glob](https://github.com/isaacs/node-glob)）。
```
fis.set('vfis.config', {
    pack: {
        vendor: {
            'libs.js': ['node_modules/**'],
            'pages.js': ['pages/**']
        }
    }
)
```

### 图片合并

这里的图片合并指多张PNG图片合并为雪碧图，vfis将同一个css文件下标有`__sprite`的图片合并到同一张雪碧图中。
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

## 数据模拟
模仿数据接口需要在mock目录下添加相关设置，如下：

在mock文件夹内添加`server.conf`路由设置及模拟数据文件`task.list.js`，生成后访问`http://127.0.0.1/api/tasks`就会获得你需要的模拟数据了。
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

## 使用场景
一般使用时本地测试和线上部署的结构是一样的（或者要求本地必须与线上一样），从而达到能快速找到问题并解决。可是有些比较复杂的缘由又导致两个环境目录结构并不一致，如需求方未提前说明线上环境等。为不影响本地测试环境并生成满足线上环境的使用需求，根据不同的使用场景生成相对的结构是必须的，除了`default`外提供两个使用场景：`production`生成场景、`testing`测试场景，使用和`default`一致。

### 生产场景
```
fis.set('vfis.config', {
    input: '**/(**)/(*).html',       
    output: {                   
        // 本地测试环境
        default: {
            basePath: 'assets', 
            pagePath: '',       
            pageGlob: '$2.html',  
        },
        // 生产环境
        // 参考laravel目录结构
        production: {
            basePath: 'public/assets', 
            pagePath: 'views',
            pageGlob: '$1/$2.tpl',     
        }
    }
})
```

生成目录
```
# 本地测试环境 $ vfis release
- assets/
    - src/
        - imgs/
        - main.js
        - main.scss
- index.html


# 生产环境 $ vfis release production
- public/
    - assets/
        - src/
            - imgs/
            - main.js
            - main.scss
- views/
    - index
        - index.tpl
```

### 测试场景
测试场景多了一个额外功能：推送
```
fis.set('vfis.config', {
    input: '**/(**)/(*).html',       
    output: {                   
        // 本地测试环境
        default: {
            basePath: 'assets', 
            pagePath: '',       
            pageGlob: '$2.html',    
        },
        testing: {
            basePath: 'public/assets', 
            pagePath: 'views',
            pageGlob: '$1/$2.tpl',
            //推送到服务器
            push: {
                receiver: 'http://192.168.1.220:8999/receiver',
                dir: '/www/test/t1/'
            }
        }
});
```
服务器需搭建接收服务，fis官方给出的[node端接收服务代码](https://github.com/fex-team/receiver)和[php端接收代码](https://github.com/fex-team/fis-command-release/blob/master/tools/receiver.php)
