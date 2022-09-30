const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const todoRouter = require('./models/routes/todos_routes');
const tagRouter = require('./models/routes/tag_routes');

const app = new Koa();

const PORT = process.env.PORT || 8080;

app.use(bodyParser());
app.use(cors());
app.use(todoRouter.routes()).use(todoRouter.allowedMethods());
app.use(tagRouter.routes()).use(tagRouter.allowedMethods());

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

