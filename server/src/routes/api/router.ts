const spotifyrouter = require("./spotify");
const roomrouter = require("./rooms");
const router = require("express").Router();

router.use("/spotify", spotifyrouter);
router.use("/rooms", roomrouter);

module.exports = router;