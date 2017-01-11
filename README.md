# vfis

这个项目是把fis一些基础但是必须的功能结合到一齐的工具集。它包含：

* 支持vue
* 支持sass
* autoprefixer兼容css
* babel兼容es6
* js依赖及引入
* js文件合并
* 图片合并
* ~~图片压缩~~

为了满足自动化需求必定存在一些新东西新概念需要消化，这些功能会在说明详细讲解。

* 固定的目录规范
* 三种环境的应用：部署、测试、线上环境
* 模块化
* js合并规范

## 说明

### 快速使用

### 设置

#### 目录规范

```
pages/             页面目录
└ index            
  ├ index.html
  ├ main.js
  └ main.scss
fis-conf.js        vfis配置文件
```

#### 环境的应用：部署、测试、线上环境

##### 部署环境
##### 测试环境
##### 线上环境

#### 模块化

#### 合并规范

## 运行环境
```
node 4.4.x
npm 3.10.x
python 2.7.x
fis3 3.3.12以上

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

## 安装依赖
命令行进入项目目录根
```
npm i
```

### 安装其他问题
假如运行出错，或很久不动，可能是node-sass安装问题，使用`ctrl+c`停止命令，然后重装。
```
npm rebuild node-sass
```
