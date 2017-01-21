require('normalize-css');
require('icons.scss');
const Vue = require('vue');
window.Promise = require('bluebird');
Vue.config.debug = true;

new Vue({
    el: '#layout',
    data: {
        message: 'VFIS',
        userInfo: require('user')
    },
    components: {
        test: require('./test').default
    }
});