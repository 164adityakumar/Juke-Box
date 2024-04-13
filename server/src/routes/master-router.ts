const router = require("express").Router();
const apiRouter = require("./router");

router.use("/api", apiRouter);

module.exports = router;