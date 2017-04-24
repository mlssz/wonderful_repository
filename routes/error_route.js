let express = require("express")
let router = express.Router()
exports.router = router
exports.path = "/"
let errorinfo = require("../models/errorinfo")
let task = require("../models/task")

router.head("/errors", (req, res) => {
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

router.post("/errors", (req, res) => {
    let es
    let tk
    let oneError = req.body
    if (oneError.error_code == 1) {
        if (oneError.material != null) {
            es = {
                fixed: false,
                error_code: oneError.error_code,
                repository: oneError.repository,
                location: oneError.location,
                layer: oneError.layer,
                material: oneError.material,
                image: oneError.image
            }
            tk = {
                action: 602,
                staff: null,
                status: 0,
                migration: null,
                error: null,
                publish_time: Date.now(),
                start_time: null,
                end_time: null,
                remark: null
            }
        } else {
            res.status(400).json({ error: "不合乎业务逻辑" })
            return false;
        }
    } else {
        es = {
            fixed: false,
            error_code: oneError.error_code,
            repository: oneError.repository,
            location: oneError.location,
            layer: oneError.layer,
            material: null,
            image: oneError.image
        }
        tk = {
            action: 601,
            staff: null,
            status: 0,
            migration: null,
            error: null,
            publish_time: Date.now(),
            start_time: null,
            end_time: null,
            remark: null
        }
    }
    errorinfo.insertMany([es], (err, doc) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            let d = doc[0].toObject();
            tk.error = d._id
            task.insertMany([tk], (err, doc) => {
                if (err) {
                    res.status(400).json({ error: err })
                } else {
                    let t = doc[0].toObject()
                    t.error = d
                    res.json(t).end()
                }
            })
        }
    })
})