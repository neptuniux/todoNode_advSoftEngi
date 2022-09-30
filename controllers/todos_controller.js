const db = require("../models/config/database");
const todo_structure = require("../models/structures/todo_structure");
const tag_structure = require("../models/structures/tag_structure");

module.exports = {

    async list(ctx) {
        const todos = await todo_structure.getTodoList();
        for (let i = 0; i < todos.length; i++) {
            todos[i].tags = await tag_structure.getTagsByTodoId(todos[i].id);
        }
        ctx.body = todos;
    },


    async clear(ctx) {
        await db.query('DELETE FROM "Todo"');
        ctx.status = 204;
    },

    async add(ctx) {
        const todoToCreate = todo_structure.fromJson(ctx.request.body);
        if (!todoToCreate.title) ctx.throw(400, {'error': '"title" is a required field'});
        if (typeof todoToCreate.title !== 'string' || !todoToCreate.title.length) {
            ctx.throw(400, {'error': '"title" must be a string with at least one character'});
        }
        const todoCreated = await todo_structure.createTodo(todoToCreate);
        ctx.status = 201;
        ctx.body = todoCreated;
    },

    async linkTodoToTag(ctx) {
        const todoId = ctx.params.id;
        const tagId = ctx.request.body.id;
        if (!await todo_structure.getTodoById(todoId)) ctx.throw(404, {'error': 'Todo not found'});
        await todo_structure.linkTodoToTagById(todoId, tagId);
        ctx.status = 204;
    },

    async show(ctx) {
        const id = ctx.params.id;
        const todo = await todo_structure.getTodoById(id);
        if (!todo) ctx.throw(404, {'error': 'Todo not found'});
        todo.tags = await tag_structure.getTagsByTodoId(id);
        ctx.body = todo;
    },

    async update(ctx) {
        const id = ctx.params.id;
        if (!await todo_structure.getTodoById(id)) ctx.throw(404, {'error': 'Todo not found'});
        const todo = ctx.request.body;
        ctx.body = await todo_structure.updateTodoById(id, todo);
    },

    async remove(ctx) {
        const id = ctx.params.id;
        if (!await todo_structure.getTodoById(id)) ctx.throw(404, {'error': 'Todo not found'});
        await todo_structure.deleteTodoById(id);
        ctx.status = 204;
    },

    async deleteAllTagByTodoId(ctx) {
        const id = ctx.params.id;
        if (!await todo_structure.getTodoById(id)) ctx.throw(404, {'error': 'Todo not found'});
        await todo_structure.deleteAllTagByTodoId(id);
        ctx.status = 204;
    },

    async deleteTagByTodoId(ctx) {
        const todoId = ctx.params.id;
        const tagId = ctx.params.tag_id;
        if (!await todo_structure.getTodoById(todoId)) ctx.throw(404, {'error': 'Todo not found'});
        if (!await tag_structure.getTagById(tagId)) ctx.throw(404, {'error': 'Tag not found'});
        await todo_structure.deleteTagByTodoId(todoId, tagId);
        ctx.status = 204;
    }
}

