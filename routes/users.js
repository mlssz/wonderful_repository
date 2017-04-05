let express = require("express")
let router = express.Router()
exports.router = router
exports.path = "/users"

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource")
})
