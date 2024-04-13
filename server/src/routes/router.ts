const spotifyrouter = require("./api/spotify");
const roomrouter = require("./api/rooms");
const router = require("express").Router();

router.use("/spotify", spotifyrouter);
router.use("/rooms", roomrouter);

module.exports = router;