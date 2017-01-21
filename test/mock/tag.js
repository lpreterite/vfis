var model = {
    get: function(req){
        return {
            id: 1,
            title: '测试'
        }
    },
    post: function(req){
        return Object.assign(req.body, {id: 1})
    },
    put: function(req){
        return req.body
    },
    delete: function(req){
        return req.query.id
    }
}

module.exports = function(req, res, next) {
    var action = model[req.method.toLowerCase()]
    res.end(JSON.stringify(action(req)));
};