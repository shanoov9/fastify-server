const fastify = require("fastify");
const PORT = process.env.PORT || 3000;
const routes = require("./routes/Routes");
const path = require("path");
const multer = require("fastify-multer");

const db = require("./model");
const app = fastify({
  logger: true,
});
// app.register(db)
app.register(multer.contentParser);
app.register(require("@fastify/cors"), {
  origin: "*",
  corsOptions: 200,
});
app.register(require('fastify-boom'))
routes.forEach((route, index) => {
  app.route(route);
});
app.register(require("@fastify/static"), {
  root: path.join(__dirname, "public/images"),
  prefix: "/public/images/",
});
//default get routes
app.get("/", async () => {
  return {
    Message: "Server is On Fire",
  };
});

const start = async () => {
  try {
    await db.sequelize.sync();
    await app.listen(PORT);
    app.log.info(`server listening on ${app.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
