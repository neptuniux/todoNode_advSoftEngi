const router = require('koa-router')();
const todoController = require("../../controllers/todos_controller");
const tagController = require("../../controllers/tags_controller");

router.get('/', todoController.list);
router.get('/todos/', todoController.list)
    .del('/todos/', todoController.clear)
    .post('/todos/', todoController.add)
    .get('todo', '/todos/:id', todoController.show)
    .patch('/todos/:id', todoController.update)
    .del('/todos/:id', todoController.remove);

router.get('/todos/:id/tags/', tagController.listByTodoId)
    .post('/todos/:id/tags/', todoController.linkTodoToTag)
    .del('/todos/:id/tags/', todoController.deleteAllTagByTodoId)
    .del('/todos/:id/tags/:tag_id', todoController.deleteTagByTodoId);


module.exports = router;
