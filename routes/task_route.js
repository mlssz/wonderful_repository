let express = require("express")
let router = express.Router()
exports.router = router
exports.path = "/"
let repository = require("../models/repository")
let material = require("../models/material")
let migration = require("../models/migration")
let task = require("../models/task")
let errorinfo = require("../models/errorinfo")
let exportinfo = require("../models/exportinfo")
let staff = require("../models/staff")
let mongoose = require("mongoose")
let ObjectId = mongoose.Types.ObjectId

router.head("/tasks", (req, res) => {
    let others = req.query.others
    others == null ? others = [] : others
    let query = {}
    for (let i in others) {
        if (ohters[i].key && (typeof ohters[i].key === "string")) {
            if (ohters[i].value) {
                query[ohters[i].key] = ohters[i].value
            } else {
                if (ohters[i].region) {
                    query[ohters[i].key] = ohters[i].region
                } else {
                    continue
                }
            }
        } else {
            continue
        }
    }
    task.count(query, (err, num) => {
        if (err) {
            res.status(400).json({ error: JSON.stringify(err) })
        } else {
            res.status(200).append("num", num).end()
        }
    })
})

router.get("/tasks", (req, res) => {
    var page = parseInt(req.query.page)
    var size = parseInt(req.query.limit)
    var query = req.query.others
    if (query == null) {
        task.find({}, null, { limit: size, skip: size * page }, (err, docs) => {
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
        query = findHelp.findByQuery(task, query);
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

function combineTasks(task) {
    let _id = task._id

}

router.post("/tasks", (req, res) => {
    let account = req.body.account
    staff.findOne({ account: account }, (err, doc) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            if (doc == null) {
                res.status(400).json({ error: "用户不存在" })
            } else {
                doc = doc.toObject()
                task.count({ staff: doc._id, status: { $lt: 2 } }, (err, num) => {
                    if (err) {
                        res.status(400).json({ error: err })
                    } else {
                        if (num >= 0 && num < 10) {
                            task.find({ staff: null }, null, { limit: (10 - num) }, (err, ss) => {
                                if (err) {
                                    res.status(400).json({ error: err })
                                } else {
                                    ss = ss.toObject()
                                    task.update({ $in: ss }, { staff: doc._id }, (err) => {
                                        if (err) {
                                            res.status(400).json({ error: err })
                                        } else {
                                            // res.
                                        }
                                    })
                                }
                            })
                        } else {
                            res.status(400).json({ error: "不能添加新的任务了，快去完成你已接的任务吧" })
                        }
                    }
                })
            }
        }
    })
})