const Koa = require('koa');
const Router = require('koa-router');
const Pool = require('pg').Pool;
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

const connectionString =
  'postgres://gwjojiyf:VU66g52WQnZEj5NCEKGH6vB121yk-tl6@pellefant.db.elephantsql.com:5432/gwjojiyf';

const pool = new Pool({
  connectionString
});

async function get_employees() {
  try {
  } catch (e) {
    console.log(e);
  }
}

async function get_employees() {
  const response = await pool.query(`SELECT * FROM EMPLOYEE LIMIT 100`);
  return response.rows;
}

router.get('/', (ctx, next) => {
  ctx.body = `
  Welcome to root page:
    GET /getEmployees - Fetch all employees
    POST /enterEmployee - Store one employee {id int, name text, dept int}
    DELETE /deleteEmployee/2 - Delete an employee of ID 2
  `;
});

router.get('/getEmployees', async ctx => {
  ctx.body = await get_employees();
});

router.post('/enterEmployee', async ctx => {
  const { id, name, dept } = ctx.request.body;
  await pool.query(
    `INSERT INTO EMPLOYEE VALUES ('${id}', '${name}', '${dept}')`
  );
  ctx.body = await get_employees();
});

router.delete('/deleteEmployee/:id', async ctx => {
  await pool.query(`DELETE FROM EMPLOYEE WHERE EMP_ID = ${ctx.params.id}`);
  ctx.body = await get_employees();
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
