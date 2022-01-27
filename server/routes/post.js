const router = require("express").Router()
const authToken = require("../middleware/authenticate-token");
const postController = require("../controllers/post-controller")


router.get("/private", authToken,postController.viewPrivatePost);

module.exports = router;