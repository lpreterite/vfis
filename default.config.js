module.exports = exports.defaults = {
    babel: {
        postfix: ['.es6']
    },
    autoprefixer: {
        "browsers":  ["> 5%", "last 2 versions"],
        "cascade": true,
        "flexboxfixer": true,
        "gradientfixer": true
    },
    modules: {
        paths: {},
        packages: {},
        shim: {},
        ignore: ['**/requirejs/**','mock/**'],
        tab: 4,
        extList: ['.js', '.coffee', '.jsx', '.es6', '.vue']
    },
    pack: {
        output: 'pkg',
        vendor: {},
        ignore: []
    },
    push: {
        receiver: '',
        dir: ''
    }
};
