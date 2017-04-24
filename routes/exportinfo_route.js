let express = require("express")
let router = express.Router()
exports.router = router
exports.path = "/"
let exportinfo = require("../models/exportinfo")

router.head("/exportinfos", (req, res) => {
    exportinfo.count(null, (err, num) => {
        if (err) {
            res.status(400).json({ error: JSON.stringify(err) })
        } else {
            res.status(200).append("num", num).end()
        }
    })
})

router.get("/exportinfos", (req, res) => {
    var page = parseInt(req.query.page)
    var size = parseInt(req.query.limit)
    var query = req.query.others
    if (query == null) {
        exportinfo.find({}, null, { limit: size, skip: size * page }, (err, docs) => {
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
        query = findHelp.findByQuery(exportinfo, query);
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