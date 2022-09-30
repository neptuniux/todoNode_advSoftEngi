const db = require("../config/database");

class tag_structure {

    constructor(id = -1 , title, url = '', todos = []) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.todos = todos;

    }


    static fromJson(json) {
        const tag = new tag_structure();
        tag.id = json.id || -1;
        tag.title = json.title;
        tag.url = json.url;
        tag.todos = json.todos;
        return tag;
    }
    static fromJsonArray(array) {
        if (typeof array === "undefined" || array.length === 0 ) return [];
        const tags = [];
        for (let i = 0; i < array.length; i++) {
            tags.push(this.fromJson(array[i]));
        }
        return tags;
    }

    static async getTagById(id) {
        const {rows} = await db.query('SELECT * FROM "Tag" WHERE id = $1;', [id]);
        if (rows.length === 0) return null;
        return new tag_structure(rows[0].id,rows[0].title, rows[0].url);
    }

    static async getTagsByTodoId(id) {
        const {rows} = await db.query('SELECT title, id, url FROM "Tag" JOIN "Todo_has_tag" ON "Tag".id = "Todo_has_tag".id_tag WHERE "Todo_has_tag".id_todo = $1;', [id]);
        for (let i = 0; i < rows.length; i++) {
            rows[i] = new tag_structure(rows[i].id,rows[i].title, rows[i].url);
        }
        return rows;
    }

    static async getTagList() {
        const {rows} = await db.query('SELECT * FROM "Tag";');
        for (let i = 0; i < rows.length; i++) {
            rows[i] = new tag_structure(rows[i].id,rows[i].title, rows[i].url);
        }
        return rows;
    }

    static async createTag(tag) {
        const {rows} = await db.query('SELECT pg_sequence_last_value( pg_get_serial_sequence(\'"Tag"\',\'id\'));')
        tag.url = 'http://localhost:8080/tags/' + (parseInt(rows[0].pg_sequence_last_value)+parseInt(1));
        const result = await db.query('INSERT INTO "Tag" (title, url) VALUES ($1, $2) returning id;', [tag.title, tag.url]);
        return this.getTagById(result.rows[0].id);
    }

    static async updateTagById(id, tag) {
        await db.query('UPDATE "Tag" SET title = COALESCE($1,title), url = COALESCE($2,url) WHERE id = $3;', [tag.title, tag.url, id]);
        return this.getTagById(id);
    }

    static async deleteTagById(id) {
        await db.query('DELETE FROM "Tag" WHERE id = $1;', [id]);
    }


}

module.exports = tag_structure;
