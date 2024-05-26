const roomrouter = require("./rooms");
const router = require("express").Router();

router.use("/rooms", roomrouter);

module.exports = router;