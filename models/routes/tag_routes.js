const router = require('koa-router')();
const tagController = require("../../controllers/tags_controller");

router.get('/tags/', tagController.list)
    .del('/tags/', tagController.clear)
    .post('/tags/', tagController.add)
    .get('tag', '/tags/:id', tagController.show)
    .patch('/tags/:id', tagController.update)
    .del('/tags/:id', tagController.remove)
    .get('/tags/:id/todos/', tagController.getTodoByTagId);

module.exports = router;
