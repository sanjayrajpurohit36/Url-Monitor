module.exports = function(app, db) {
  const URL = require("../controllers/url.controller.js");
  app.post("/", URL.create);
  app.get("/", URL.getAll);
  app.get("/:id", URL.get);
  app.put("/:id", URL.update);
  app.delete("/:id", URL.delete);
};
