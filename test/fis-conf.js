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
    package: {
        vendor: {
            'require.js': ['node_modules/requirejs/**']
        }
    }
});

build();