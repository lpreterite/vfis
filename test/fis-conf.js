'use strict';

const build = require('../build'),
      pithy = require('../build').pithy; 

build();

pithy({
    ignore: ['*.js'],
    input: 'src/(*.html)',
    output: {
        default:{
            basePath: 'assets',
            pagePath: '',
            url: '',
            domain: '',
        }
    },
    modules: {
        packages: [{
            name: 'user',
            location: 'src/user',
            main: 'info.js'
        }]
    },
    pack: {
        vendor: {
            'vender.js': ['node_modules/requirejs/**','node_modules/lib-flexible/**']
        }
    }
});

fis.match('**.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor', {type : 'pngquant'})
});