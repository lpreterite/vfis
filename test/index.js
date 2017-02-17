var chai = require("chai"),
    chaiAsPromised = require("chai-as-promised"),
    assert = chai.assert;

chai.use(chaiAsPromised);

var path = require('path'),
    fs = require('fs');
var vfis = require('..'),
    cli = vfis.cli,
    project = vfis.project
    
suite('develop', function(){
    test('general', function(){
        var _root = vfis.util(__dirname);
        project.setProjectRoot(_root);
        project.setTempRoot(_root);

        var cwd1 = _root;
        var cwd2 = _root.substring(0,_root.lastIndexOf("/")) + "/bin/fis.js";
        var env = {
                cwd: cwd1,
                require: [],
                configNameSearch: [ 'fis-conf.js' ],
                configPath: null,
                configBase: undefined,
                modulePath: undefined,
                modulePackage: {}
            };

        this.timeout(50000);
        process.argv = [ 'node', cwd2, '-v'];
        var argv = { _: [], v: true };
        cli.run(argv, env);

        process.argv = [ 'node', cwd2, 'release','-d', 'output'];
        var argv = { _: [ 'release' ], d:'output' };
        var env = { cwd: cwd1,
          require: [],
          configNameSearch: [ 'fis-conf.js' ],
          configPath: cwd1 + '/fis-conf.js',
          configBase: cwd1,
          modulePath: undefined,
          modulePackage: {} };
        cli.run(argv, env);
    });
    test('have mock', function(){
        var mockDir = fs.statSync(path.join(__dirname, 'output/mock'));
        return assert.isOk(mockDir.isDirectory);
    });
    test('have mock data', function(){
        try{
            fs.statSync(path.join(__dirname, 'output/mock'));
            return assert.isOk(true);
        }catch(e){
            return assert.isOk(false);
        }
    });
    test('have sprite', function(){
        try{
            fs.statSync(path.join(__dirname, 'output/assets/src/icons_z.png'));
            return assert.isOk(true);
        }catch(e){
            return assert.isOk(false);
        }
    });
    test('can convert vue file', function(){
        try{
            fs.statSync(path.join(__dirname, 'output/assets/src/test.js'));
            return assert.isOk(true);
        }catch(e){
            return assert.isOk(false);
        }
    });
});

suite('production', function(){
    test('general', function(){
        var _root = vfis.util(__dirname);

        project.setProjectRoot(_root);
        project.setTempRoot(_root);

        var cwd1 = _root;
        var cwd2 = _root.substring(0,_root.lastIndexOf("/")) + "/bin/fis.js";
        var env = {
                cwd: cwd1,
                require: [],
                configNameSearch: [ 'fis-conf.js' ],
                configPath: null,
                configBase: undefined,
                modulePath: undefined,
                modulePackage: {}
            };

        this.timeout(50000);
        process.argv = [ 'node', cwd2, '-v'];
        var argv = { _: [], v: true };
        cli.run(argv, env);

        process.argv = [ 'node', cwd2, 'release','production','-d', './test/dist'];
        var argv = { _: [ 'release', 'production' ], d:'./test/dist' };
        var env = { cwd: cwd1,
          require: [],
          configNameSearch: [ 'fis-conf.js' ],
          configPath: cwd1 + '/fis-conf.js',
          configBase: cwd1,
          modulePath: undefined,
          modulePackage: {} };
        cli.run(argv, env);
    });
    test('have pkg', function(){
        var mockDir = fs.statSync(path.join(__dirname, 'dist/assets/pkg'));
        return assert.isOk(mockDir.isDirectory);
    });
    test('have vendor', function(){
        var mockDir = fs.statSync(path.join(__dirname, 'dist/assets/pkg/vendor'));
        return assert.isOk(mockDir.isDirectory);
    });
});