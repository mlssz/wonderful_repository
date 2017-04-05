let express = require("express")
let router = express.Router()
exports.router = router
exports.path = "/"

router.head("/", (req, res, next) => {
  let result = req.query["value"] || "none"
  res.status(200).json({"value": result})
})
router.get("/", (req, res, next) => {
  let result = req.query["value"] || "none"
  res.status(200).json({"value": result})
})
router.post("/", (req, res, next) => {
  let result = req.body["value"] || "none"
  res.json({"value": result})
})
router.put("/", (req, res, next) => {
  let result = req.body["value"] || "none"
  res.json({"value": result})
})
router.patch("/", (req, res, next) => {
  let result = req.body["value"] || "none"
  res.json({"value": result})
})
router.delete("/", (req, res, next) => {
  let result = req.body["value"] || "none"
  res.json({"value": result})
})
