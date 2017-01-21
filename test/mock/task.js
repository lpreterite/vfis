var model = {
    get: function(req){
        return {
            id: 3,
            title: "这任务有描述",
            description: "描述？喵喵喵？",
            complete: false,
            tags: [],
            createAt: 1467275596425,
            updateAt: null,
            deleteAt: null
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