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
let mongoose = require("mongoose")
let ObjectId = mongoose.Types.ObjectId

router.get("/repository/:id", (req, res) => {
    let id = Number.parseInt(req.params.id);
    repository.findOne({ id: (id) }, (err, doc) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(400).json({ error: "没有相关记录" })
            }
        }
    })
})

router.delete("/repository/:id", (req, res) => {
    let id = Number.parseInt(req.params.id);
    if (id != null && id.length == 24) {
        id = ObjectId(id)
    } else {
        res.status(400).json({ error: "参数ID不合要求" })
        return false
    }
    migration.find({ $or: [{ to_repository: id }, { from_repository: id }] }, "_id", (err, miids) => {
        if (err) {
            res.status(400).json({ error: "获取迁移信息失败" + err })
        } else {
            errorinfo.find({ repository: id }, "_id", (err, erids) => {
                if (err) {
                    res.status(400).json({ error: "获取错误信息失败" + err })
                } else {
                    let cs = []
                    if (miids != null && miids.length > 0) {
                        cs.push({ migration: { $in: miids } })
                    }
                    if (erids != null && erids.length > 0) {
                        cs.push({ error: { $in: erids } })
                    }
                    if (cs.length > 0) {
                        task.delete({ $or: cs }, (err) => {
                            if (err) {
                                res.status(400).json({ error: "获取任务信息失败" + err })
                            } else {
                                deleteOne(id, req, res)
                            }
                        })
                    } else {
                        deleteOne(id, req, res)
                    }
                }
            })
        }
    })
})

function deleteOne(id, req, res) {
    repository.deleteOne({ _id: id }, (err) => {
        if (err) {
            res.status(400).json({ error: "删除仓库失败" + err })
        } else {
            migration.deleteMany({ $or: [{ to_repository: id }, { from_repository: id }] }, (err) => {
                if (err) {
                    res.status(400).json({ error: "删除仓库迁移信息失败" + err })
                } else {
                    errorinfo.deleteMany({ repository: id }, (err) => {
                        if (err) {
                            res.status(400).json({ error: "删除仓库错误信息失败" + err })
                        } else {
                            material.deleteMany({ repository_id: id }, (err) => {
                                if (err) {
                                    res.status(400).json({ error: "删除仓库物品信息失败" + err })
                                } else {
                                    exportinfo.deleteMany({ from_repository: id }, (err) => {
                                        if (err) {
                                            res.status(400).json({ error: "删除仓库出库信息失败" + err })
                                        } else {
                                            res.status(200).json({ msg: "删除成功" })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

router.get("/repositories", (req, res) => {
    repository.find({}, "_id id available_space stored_count", (err, repos) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            if (repos == null || repos.length < 1) {
                res.status(400).json({ error: "找不到任何记录" })
            } else {
                res.status(200).json(repos)
            }
        }
    })
})

router.post("/repositories", (req, res) => {
    let id = req.body.id;
    if (id == null) {
        res.status(400).json({ error: "ID不能为空" })
    } else {
        repository.findOne({ id: id }, (err, doc) => {
            if (err) {
                res.status(400).json({ error: err })
            } else {
                if (doc == null) {
                    let n = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
                    let m = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
                    let ls = []
                    for (let i = 1; i <= 44; i++) {
                        ls.push({ id: i, place: m[i - 1], label: n[i - 1], available_space: 60, materials_num: [0, 0, 0] })
                    }
                    let repo = {
                        id: id,
                        available_space: 2640,
                        locations: ls,
                        stored_count: 0
                    }
                    repository.insertMany(repo, (err, doc) => {
                        if (err) {
                            res.status(400).json({ error: err })
                        } else {
                            res.status(200).json(doc)
                        }
                    })
                } else {
                    res.status(400).json({ error: "ID重复" })
                }
            }
        })
    }
})

router.delete("/repositories", (req, res) => {
    repository.deleteMany({}, (err) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            material.deleteMany({}, (err) => {
                if (err) {
                    res.status(400).json({ error: err })
                } else {
                    migration.deleteMany({}, (err) => {
                        if (err) {
                            res.status(400).json({ error: err })
                        } else {
                            errorinfo.deleteMany({}, (err) => {
                                if (err) {
                                    res.status(400).json({ error: err })
                                } else {
                                    exportinfo.deleteMany({}, (err) => {
                                        if (err) {
                                            res.status(400).json({ error: err })
                                        } else {
                                            task.deleteMany({}, (err) => {
                                                if (err) {
                                                    res.status(400).json({ error: err })
                                                } else {
                                                    res.status(200).json({ msg: "成功" })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

router.get("/repository/:id/locations", (req, res) => {
    repository.find({ id: (Number.parseInt(req.params.id)) }, "locations", (err, repos) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            repos = repos[0].locations
            let ok = []
            for (let i in repos) {
                for (let j = 0; j < 3; j++) {
                    if ((20-repos[i].materials_num[j]) >= num){
                        ok.push({location:parseInt(i),layer:j,num:num})
                        num = 0
                        break
                    } else {
                        ok.push({location:parseInt(i),layer:j,num:(20-repos[i].materials_num[j])})
                        num = num - (20-repos[i].materials_num[j])
                    }
                }
                if (num < 1) {
                    break;
                }
            }
            res.status(200).json(ok)
        }
    })
})



router.get("/repository/:id/empty-location", (req, res) => {
    let id = Number.parseInt(req.params.id);
    let num = parseInt(req.query.num)
    let width = parseInt(req.query.width)
    let length = parseInt(req.query.length)
    let height = parseInt(req.query.height)
    repository.findOne({ id: (id) }, (err, doc) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            if (doc) {
                res.status(200).json(doc.locations)
            } else {
                res.status(400).json({ error: "没有相关记录" })
            }
        }
    })
})
