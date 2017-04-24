let express = require("express")
let router = express.Router()
exports.router = router
exports.path = "/"
let errorinfo = require("../models/errorinfo")

router.head("/errors",(req, res) => {
    errorinfo.count(null, (err, num) => {
    if (err) {
      res.status(400).json({ error: JSON.stringify(err) })
    } else {
      res.status(200).append("num", num).end()
    }
  })
})

router.get("/errors", (req, res) => {
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.limit)
  var query = req.query.others
  if (query == null) {
    errorinfo.find({}, null, { limit: size, skip: size * page }, (err, docs) => {
      if (err) {
        res.status(400).json({ error: JSON.stringify(err) })
      } else {
        if (docs == null || docs.length < 1) {
          res.status(400).json({ error: "没有找到相关记录" })
        } else {
          res.status(200).json(docs)
        }
      }
    })
  } else {
    query = findHelp.findByQuery(errorinfo, query);
    query = findHelp.slicePage(query, page, size)
    query.exec().then((result) => {
      if (result == null || result.length < 1) {
        res.status(400).json({ error: "没有找到记录" })
      } else {
        res.status(200).json(result)
      }
    }).catch((err) => {
      res.status(400).json({ error: JSON.stringify(err) })
    })
  }
})