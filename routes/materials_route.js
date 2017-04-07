let express = require("express")
let router = express.Router()
exports.router = router
exports.path = "/"

router.get("/materials/", (req, res, next) => res.status(501).end())

router.get("/repositories/:id/materials/", (req, res, next) => res.status(501).end())

router.get("/material/:id/", (req, res, next) => res.status(501).end())


router.post("/materials/", (req, res, next) => res.status(501).end())

router.get("/test/:id", (req, res, next) => {
  let result = req.body["value"] || "none"
  res.json({"value": result})
})
router.get("/test/:id/auth", (req, res, next) => {
  res.json({"value": "auth"})
})

router.patch("/", (req, res, next) => {
  let result = req.body["value"] || "none"
  res.json({"value": result})
})
router.delete("/", (req, res, next) => {
  let result = req.body["value"] || "none"
  res.json({"value": result})
})
