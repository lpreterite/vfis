# vfis-cli

[![Build Status](https://travis-ci.org/lpreterite/vfis.svg?branch=master)](https://travis-ci.org/lpreterite/vfis)

这个项目是把基于fis3构建的比较常用的功能集成一起的构建工具。包含功能以下功能：

- [x] 支持vue
- [x] 支持sass
- [x] autoprefixer兼容css
- [x] babel兼容es6
- [x] js依赖及引入
- [x] 按需合并文件
- [x] 图片合并
- [x] 图片压缩

## 安装及使用

### 安装
```
npm i -g vfis-cli
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


## 设置
配合简易的设置可简化更多工作，下面是简单的使用例子，如想了解更多可看[详细文档](https://github.com/lpreterite/vfis/tree/master/build/README.md)。

### 快速上手

第一步，安装
```
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
