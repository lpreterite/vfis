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
    }
});

build();