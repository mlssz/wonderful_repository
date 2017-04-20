let express = require("express")
let router = express.Router()
exports.router = router
exports.path = "/test"

/* GET users listing. */
router.get("/", (req, res, next) => {
  console.log(req.query);
  res.status(200).json(req.query).end();
})

router.get("/sw/:id", (req, res, next) => {
  res.status(200).end(req.params.id);
})
