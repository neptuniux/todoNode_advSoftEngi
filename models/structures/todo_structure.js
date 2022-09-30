const db = require("../config/database");
const tag_structure = require("../structures/tag_structure");

class todo_structure {

    constructor(id = -1 , title, completed = false, order = 0, url = '', tags = []) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.order = order;
        this.url = url;
        this.tags = tags;
    }



    static fromJson(json) {
        const todo = new todo_structure();
        todo.id = json.id || -1;
        todo.title = json.title;
        todo.completed = json.completed || false;
        todo.order = json.order || 0;
        todo.url = json.url;
        todo.tags =  json.tags;
        return todo;
    }

    static fromJsonArray(jsonArray) {
        if (typeof jsonArray === "undefined" || jsonArray.length === 0 ) return [];
        const todos = [];
        for (let i = 0; i < jsonArray.length; i++) {
            todos.push(this.fromJson(jsonArray[i]));
        }
        return todos;
    }


    static async getTodoById(id) {
        const {rows} = await db.query('SELECT * FROM "Todo" WHERE id = $1;', [id]);
        if (rows.length === 0) return null;
        return new todo_structure(rows[0].id,rows[0].title, rows[0].completed, rows[0].order, rows[0].url);
    }

    static async getTodoList() {
        const {rows} = await db.query('SELECT * FROM "Todo" ORDER BY "order";');
        for (let i = 0; i < rows.length; i++) {
            rows[i] = new todo_structure(rows[i].id,rows[i].title, rows[i].completed, rows[i].order, rows[i].url);
        }
        return rows;
    }

    static async createTodo(todo) {
        const {rows} = await db.query('SELECT pg_sequence_last_value( pg_get_serial_sequence(\'"Todo"\',\'id\'));')
        todo.url = 'http://localhost:8080/todos/' + (parseInt(rows[0].pg_sequence_last_value)+parseInt(1));
        const result = await db.query('INSERT INTO "Todo" (title, completed, "order", url) VALUES ($1, $2, $3, $4) returning id;', [todo.title, todo.completed, todo.order, todo.url]);
        return this.getTodoById(result.rows[0].id);
    }

    static async updateTodoById(id, todo) {
        await db.query('UPDATE "Todo" SET title = COALESCE($1,title), completed = COALESCE($2,completed), "order" = COALESCE($3,"order"), url = COALESCE($4,url) WHERE id = $5;', [todo.title, todo.completed, todo.order, todo.url, id]);
        return this.getTodoById(id);
    }

    static async deleteTodoById(id) {
        await db.query('DELETE FROM "Todo" WHERE id = $1;', [id]);
    }

    static async linkTodoToTagById(todoId, tagId) {
        await db.query('INSERT INTO "Todo_has_tag" (id_todo, id_tag) VALUES ($1, $2);', [todoId, tagId]);
    }

    static async deleteAllTagByTodoId(todoId) {
        await db.query('DELETE FROM "Todo_has_tag" WHERE id_todo = $1;', [todoId]);
    }

    static async deleteTagByTodoId(todoId, tagId) {
        await db.query('DELETE FROM "Todo_has_tag" WHERE id_todo = $1 AND id_tag = $2;', [todoId, tagId]);
    }

    static async getTodoByTagId(id) {
        const {rows} = await db.query('SELECT * FROM "Todo" NATURAL JOIN "Todo_has_tag" WHERE "Todo_has_tag".id_tag = $1;', [id]);
        for (let i = 0; i < rows.length; i++) {
            rows[i] = new todo_structure(rows[i].id,rows[i].title, rows[i].completed, rows[i].order, rows[i].url);
        }
        return rows;
    }

}

module.exports = todo_structure;
