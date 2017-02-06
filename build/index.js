'use strict';

module.exports = exports.default = function(){

const path = require('path');
const utils = require('./utils');
const defaults = require('./default.config');
const options =  Object.assign({}, defaults, fis.get('vfis.config'));

options.mock = Object.assign({}, defaults.mock, options.mock);
options.modules = Object.assign({}, defaults.modules, options.modules);
options.modules.ignore = [].concat(options.modules.ignore, [path.posix.join(options.mock.input,'/**')]);
options.ignore = options.ignore.concat(defaults.ignore);
options.babel.presets =
    options.babel.presets ? 
    [require('babel-preset-es2015'), require('babel-preset-es2016'), require('babel-preset-stage-3'),require('babel-preset-react') ].concat(options.babel.presets) : [];

fis.set('project.ignore', [].concat(fis.get('project.ignore'), options.ignore));
fis.set('vfis.config', options);

fis.unhook('components');
fis.hook('node_modules');

const outputDef = Object.assign({}, defaults.output.default, options.output.default);
const outputPro = Object.assign({}, defaults.output.production, options.output.production);
const outputTes = Object.assign({}, defaults.output.testing, options.output.testing);

// 发布
fis.match('**', {
    release: path.posix.join(outputDef.basePath, '$0'),
    domain: outputDef.domain,
    url: path.posix.join('/', outputDef.basePath, outputDef.url) + '$&', //改变引用地址
});

// 产出页面
fis.match(options.input, {
    release: path.posix.join(outputDef.pagePath, outputDef.pageGlob)
});

// vue
fis.match('**.vue', {
    isMod: true,
    rExt: 'js',
    parser: fis.plugin('vue-component')
});

// js
fis.match('**.js', {
    isMod: true,
    skipBrowserify: true
});
const postfixArray = options.babel.postfix.map( postfix => `**.${postfix}` );
fis.match(`{${postfixArray.join(',')},**.vue:js}`, {
    rExt: 'js',
    parser: fis.plugin('babel-6.x', options.babel.presets)
});
fis.match('{**.js,**.es6,**.vue:js}', {
    useSameNameRequire: true,
    preprocessor: [
      fis.plugin('js-require-css'),
      fis.plugin('js-require-file', {
        useEmbedWhenSizeLessThan: 8 * 1024 // 小于10k用base64
      })
    ]
});

// css
fis.match('{**.css,**.vue:css}', {
    useSprite: true
});
fis.match('{**.scss,**.vue:scss}', {
    useSprite: true,
    rExt: 'css',
    parser: fis.plugin('node-sass', {outputStyle: 'expanded'}),
    postprocessor : fis.plugin("autoprefixer", options.autoprefixer)
});

// png
fis.match('**.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor', {type : 'pngquant'})
});

// browserify
fis.match('node_modules/**', {
    skipBrowserify: false
});

// ignore mod
options.modules.ignore.forEach(function(path){
    fis.match(path, {
        isMod: false 
    }); 
});

// modules
fis.hook('commonjs', options.modules);

// packages
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        resourceType: 'amd',
        useInlineMap: true,
        allInOne: false
    }),
    spriter: fis.plugin('csssprites')
});

// mock
fis.match(path.posix.join(options.mock.input,'(**)'),{
    release: path.posix.join(options.mock.output,'$1')
});
fis.match(path.posix.join(options.mock.input,'(server.conf)'),{
    release: 'config/$1'
});

/** [production setting]============================================= */

fis.media('production').match('**', {
    release: path.posix.join(outputPro.basePath, '$0'),
    domain: outputPro.domain,
    url: path.posix.join('/', outputPro.basePath, outputPro.url) + '$&' //改变引用地址
});
fis.media('production').match(options.input, {
    release: path.posix.join(outputPro.pagePath, outputPro.pageGlob)
});
fis.media('production').match('{**.js,**.es6,**.vue:js}', {
    useHash: true,
    optimizer: fis.plugin('uglify-js')
});
fis.media('production').match('{**.css,**.scss,**.vue:css,**.vue:scss}', {
    useHash: true,
    optimizer: fis.plugin('clean-css')
});
fis.media('production').match(path.posix.join(options.mock.input,'**'),{
    release: false
});
fis.media('production').match(path.posix.join(options.mock.input,'(server.conf)'),{
    release: false
});

const pkg = utils.packages(options.pack);
fis.media('production').match('::package', {
    postpackager: fis.plugin('loader', {
        useInlineMap: false,
        resourceType: 'amd',
        allInOne: {
            useTrack: true,
            includeAsyncs: true, //合并所有异步文件
            ignore: [].concat(pkg.ignore)
        }
    }),
    packager: fis.plugin('deps-pack', pkg.packages),
    spriter: fis.plugin('csssprites')
});


/** [testing setting]============================================= */

fis.media('testing').match('**', {
    release: path.posix.join(outputTes.basePath, '$0'),
    domain: outputTes.domain,
    url: path.posix.join('/', outputTes.basePath, outputTes.url) + '$&' //改变引用地址
});
fis.media('testing').match(options.input, {
    release: path.posix.join(outputTes.pagePath, outputTes.pageGlob)
});
fis.media('testing').match('{**.js,**.es6,**.vue:js}', {
    useHash: true,
    optimizer: fis.plugin('uglify-js')
});
fis.media('testing').match('{**.css,**.scss,**.vue:css,**.vue:scss}', {
    useHash: true,
    optimizer: fis.plugin('clean-css')
});
fis.media('testing').match(path.posix.join(options.mock.input,'**'),{
    release: false
});
fis.media('testing').match(path.posix.join(options.mock.input,'(server.conf)'),{
    release: false
});
if(!!outputTes.push){
    //部署到测试机
    fis.media('testing').match('*',{
        deploy: fis.plugin('http-push', {
            receiver: outputTes.push.receiver, //部署服务地址
            to: outputTes.push.dir //部署目录
        })
    });
}

};