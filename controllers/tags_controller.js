const db = require("../models/config/database");
const tag_structure = require("../models/structures/tag_structure");
const todo_structure = require("../models/structures/todo_structure");

module.exports = {

    async list(ctx) {
        const tags = await tag_structure.getTagList();
        for (let i = 0; i < tags.length; i++) {
            tags[i].todos = await todo_structure.getTodoByTagId(tags[i].id);
        }
        ctx.body = tags;
    },

    async listByTodoId(ctx) {
        const id = ctx.params.id;
        if (!await todo_structure.getTodoById(id)) ctx.throw(404, {'error': 'Todo not found'});
        ctx.body = await tag_structure.getTagsByTodoId(id);
    },

    async clear(ctx) {
        await db.query('DELETE FROM "Tag"');
        ctx.status = 204;
    },

    async add(ctx) {
        const tagToCreate = tag_structure.fromJson(ctx.request.body);
        if (!tagToCreate.title) ctx.throw(400, {'error': '"title" is a required field'});
        if (typeof tagToCreate.title !== 'string' || !tagToCreate.title.length) {
            ctx.throw(400, {'error': '"title" must be a string with at least one character'});
        }
        const tagCreated = await tag_structure.createTag(tagToCreate);
        ctx.status = 201;
        ctx.body = tagCreated;
    },



    async show(ctx) {
        const id = ctx.params.id;
        const tag = await tag_structure.getTagById(id);
        if (!tag) ctx.throw(404, {'error': 'Tag not found'});
        tag.todos = await todo_structure.getTodoByTagId(id);
        ctx.body = tag;
    },

    async update(ctx) {
        const id = ctx.params.id;
        if (!await tag_structure.getTagById(id)) ctx.throw(404, {'error': 'Tag not found'});
        const tag = ctx.request.body;
        ctx.body = await tag_structure.updateTagById(id, tag);

    },

    async remove(ctx) {
        const id = ctx.params.id;
        if (!await tag_structure.getTagById(id)) ctx.throw(404, {'error': 'Tag not found'});
        await tag_structure.deleteTagById(id);
        ctx.status = 204;

    },

    async getTodoByTagId(ctx) {
        const id = ctx.params.id;
        if (!await tag_structure.getTagById(id)) ctx.throw(404, {'error': 'Tag not found'});
        ctx.body = await todo_structure.getTodoByTagId(id);
    }

}

