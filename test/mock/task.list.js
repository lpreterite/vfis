var model = {
    get: function(req){
        return [
            {
                id: 1,
                title: "这是一个任务",
                description: "",
                complete: false,
                tags: [],
                createAt: 1467275476779,
                updateAt: null,
                deleteAt: null
            },
            {
                id: 1,
                title: "这是另一个任务",
                description: "",
                complete: false,
                tags: [{
                    id: 1,
                    title: "测试"
                }],
                createAt: 1467275534906,
                updateAt: 1467275547897,
                deleteAt: null
            },
            {
                id: 3,
                title: "这任务有描述",
                description: "描述？喵喵喵？",
                complete: false,
                tags: [],
                createAt: 1467275596425,
                updateAt: null,
                deleteAt: null
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