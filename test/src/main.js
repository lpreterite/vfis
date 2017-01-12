const Vue = require('vue');
window.Promise = require('bluebird');

new Vue({
    el: '#layout',
    data: {
        message: 'VFIS'
    },
    components: {
        test: require('./test')
    }
});