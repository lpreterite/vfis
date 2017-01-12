'use strict';

const fis = module.exports = require('fis3');
fis.require.prefixes.unshift('vfis');
fis.cli.name = 'vfis';
fis.cli.info = require('./package.json');

const build = require('./build');
build();