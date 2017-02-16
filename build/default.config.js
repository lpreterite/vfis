module.exports = exports.defaults = {
    input: '**/(*.html)',
    output: {
        default: {
            basePath: 'assets',
            pagePath: '',
            pageGlob: '$1',
            url: '',
            domain: '',
        },
        production: {
            basePath: 'assets',
            pagePath: '',
            pageGlob: '$1',
            url: '',
            domain: '',
        },
        testing: {
            basePath: 'assets',
            pagePath: '',
            pageGlob: '$1',
            url: '',
            domain: '',
            push: {
                receiver: '',
                dir: ''
            }
        }
    },
    ignore: [
        '*.md',
        '*.json',
        '*.gitignore',
        '*.sublime-project',
        'LICENSE',
        'node_modules/**',
        'bower_modules/**',
        'build/**',
        'tests/**',
        'output/**',
        'dist/**',
        'cache/**'
    ],
    babel: {
        postfix: ['es6','vue:js']
    },
    autoprefixer: {
        "browsers":  ["> 5%", "last 2 versions"],
        "cascade": true,
        "flexboxfixer": true,
        "gradientfixer": true
    },
    modules: {
        paths: {},
        packages: [],
        shim: {},
        ignore: ['**/requirejs/**','mock/**'],
        tab: 4,
        extList: ['.js', '.coffee', '.jsx', '.es6', '.vue'],
        forwardDeclaration: true,
        skipBuiltinModules: false
    },
    pack: {
        output: 'pkg',
        vendor: {},
        ignore: []
    },
    mock: {
        input: 'mock',
        output: 'mock'
    }
};
