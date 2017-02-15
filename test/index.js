var chai = require("chai"),
    chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var assert = chai.assert;

var cp = require('child_process');
    
suite('develop', function(){
    suiteSetup(function(){
        cp.exec('fis3 release -d ./output', function(e, stdout, stderr) {
            console.log('released develop start...');
        　　if(!e) {
        　　　　console.log(stdout);
        　　　　console.log(stderr);
        　　}else{
                console.log('released develop...');
            }
        });
    });
    test('have mock', function(){

    });
    test('have mock data', function(){

    });
    test('have sprite', function(){

    });
    test('can convert vue file', function(){

    });
});

suite('production', function(){
    suiteSetup(function(){
        cp.exec('fis3 release production -d ./output_prod', function(e, stdout, stderr) {
            console.log('released production start...');
        　　if(!e) {
        　　　　console.log(stdout);
        　　　　console.log(stderr);
        　　}else{
                console.log('released production...');
            }
        });
    });
    test('have mock', function(){

    });
    test('have mock data', function(){

    });
    test('have sprite', function(){

    });
    test('can convert vue file', function(){

    });
});