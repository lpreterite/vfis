const fis = module.exports = require('fis3');
fis.require.prefixes.unshift('vfis');
fis.cli.name = 'vfis';
fis.cli.info = require('./package.json');

const utils = require('./utils');
const defaults = require('./default.config');
const options =  Object.assign({}, defaults, fis.get('vfis.config'));

fis.set('vfis.config', options);

fis.unhook('components');
fis.hook('node_modules');

// 发布
fis.match('**', {
    release: '$&',
    useSameNameRequire: true,
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
fis.match('{**.es6,**.vue:js}', {
    rExt: 'js',
    parser: fis.plugin('babel-6.x', Object.assign({
        presets: [
            require('babel-preset-es2015'), 
            require('babel-preset-es2016'), 
            require('babel-preset-stage-3'),
            require('babel-preset-react')]
        }, options.babel)
    )
});
fis.match('{**.js,**.es6,**.vue:js}', {
    preprocessor: [
      fis.plugin('js-require-css'),
      fis.plugin('js-require-file', {
        useEmbedWhenSizeLessThan: 10 * 1024 // 小于10k用base64
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
    postprocessor : fis.plugin("autoprefixer", Object.assign({
        "browsers":  ["> 5%", "last 2 versions"],
        "cascade": true,
        "flexboxfixer": true,
        "gradientfixer": true
    }, options.autoprefixer))
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
fis.media('production').match('::package', {
    postpackager: fis.plugin('loader')
});

/** [production setting]============================================= */

fis.media('production').match('**', {
    useHash: true
});
fis.media('production').match('{**.js,**.es6,**.vue:js}', {
    optimizer: fis.plugin('uglify-js')
});
fis.media('production').match('{**.css,**.scss,**.vue:css,**.vue:scss}', {
    optimizer: fis.plugin('clean-css')
});

const pkg = utils.packages(options.pack);
fis.media('production').match('::package', {
    postpackager: fis.plugin('loader', {
        obtainScript: false,
        obtainStyle: true,
        useInlineMap: false,
        resourceType: 'amd',
        allInOne: {
            includeAsyncs: true, //合并所有异步文件
            ignore: [].concat(pkg.ignore)
        }
    }),
    packager: fis.plugin('deps-pack', pkg.packages)
});


/** [testing setting]============================================= */

//部署到测试机
fis.media('testing').match('*',{
    deploy: fis.plugin('http-push', {
        receiver: options.push.receiver, //部署服务地址
        to: options.push.dir //部署目录
    })
});