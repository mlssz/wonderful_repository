let express = require("express")
let router = express.Router()
exports.router = router
exports.path = "/"
let repository = require("../models/repository")
let mongoose = require("mongoose")
let ObjectId = mongoose.Types.ObjectId

router.get("/repository/:id/locations", (req, res) => {
    let id = req.params.id;
    repository.findOne({ _id: ObjectId(id) }, (err, doc) => {
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

router.get("/repository/:id/empty-location", (req, res) => {
    let id = req.params.id;
    let num = parseInt(req.query.num)
    let width = parseInt(req.query.width)
    let length = parseInt(req.query.length)
    let height = parseInt(req.query.height)
    repository.findOne({ _id: ObjectId(id) }, (err, doc) => {
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
