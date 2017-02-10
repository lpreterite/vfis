'use strict';

const build = require('../build');

fis.set('vfis.config', {
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

build();