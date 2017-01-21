var model = {
    get: function(req){
        return [
            {
                id: 1,
                title: '测试'
            },
            {
                id: 2,
                title: '前端'
            },
            {
                id: 3,
                title: '后端'
            },
            {
                id: 4,
                title: '产品'
            },
        ]
    },
    post: function(req){
        return ""
    },
    put: function(req){
        return ""
    },
    delete: function(req){
        return ""
    }
}

module.exports = function(req, res, next) {
    var action = model[req.method.toLowerCase()]
    res.end(JSON.stringify(action(req)));
};