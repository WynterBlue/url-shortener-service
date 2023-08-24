const express = require("express");
const router = express.Router();
const methodNotAllowed = require("../methodNotAllowed");
const controller = require("./urls.controller");
const usesRouter = require("../uses/uses.router");

router.use("/:urlId/uses", controller.validateUrl, usesRouter);

router.route("/:urlId")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);

router.route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;
// const router = require("express").Router();

// const controller = require("./urls.controller");
// const methodNotAllowed = require("../methodNotAllowed");
// const usesRouter = require("../uses/uses.router");

// router
//   .route("/")
//   .get(controller.list)
//   .post(controller.create)
//   .all(methodNotAllowed);

// router
//   .route("/:urlId")
//   .get(controller.read)
//   .put(controller.update)
//   .all(methodNotAllowed);

// router.use("/:urlId/uses", controller.urlIdExists, usesRouter);

// module.exports = router;