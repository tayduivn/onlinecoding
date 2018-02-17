const router = require('koa-router')();
// const authMiddleware = require('../shared/auth/auth.middleware').errorHandler();
const surveyModule = require('../modules/reports/survey/surveyReport')();
const parse = require('co-body');
const fs = require('fs-extra');
const koabusBoy = require('co-busboy');
const cmd = require('node-cmd');
const testPipeline = require('pipeline-test-node');
const mongoQuery = require('../utils/mongoQuery')();


const uuidv4 = require('uuid/v4');


function getModule(name) {
  switch (name) {
    case 'survey': {
      return surveyModule;
      break;
    }
    case 'poloLogger': {
      return poloLoggerModule;
      break;
    }
  }
}

router
  .prefix('/api/reports')
  .use(async function (ctx, next) {
  // var authHeader = ctx.req.headers.authorization;
  // var r = await jwt.verify(authHeader, config.tokenPassword);
  // ctx.request.body.tokenObj = r;

  return next().catch((err) => {
      throw err;
});
})
.post("/", async function (ctx) {
  // console.log("OOOOOOOOOOOOOOOOOOOOO");
  const body = ctx.request.body;
  // console.log(body);
  const data = body.data;
  const method = body.proxy.method;
  const module = getModule(body.proxy.module);


  const resp = await
  module[method](data, body.tokenObj);
  return resp;
})

module.exports = router;