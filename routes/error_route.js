let express = require("express")
let router = express.Router()
exports.router = router
exports.path = "/"
let repository = require("../models/repository")
let findHelp = require("../libs/find_helpers.js")
let checkHelp = require("../libs/check_helpers.js")
let errorinfo = require("../models/errorinfo")
let task = require("../models/task")
let material = require("../models/material")
let ObjectId = require("mongoose").Types.ObjectId

/*
 * req.body = { location_id: {layer: [material.id...]}}
 */
router.post("/checkresults/:id", (req, res) => {
  let checkres = req.body
  let id = Number.parseInt(req.params.id)

  return Promise.resolve()
    .then(() => material.find({repository_id: id}))
    .then(docs => {
      let errinfos = []

      for(let l_id in checkres){
        let localtion = checkres[l_id]
        let localtionDb = docs.filter(d => d.location_id.toString() === l_id)

        for(let l in localtion){
          let layer = new Set(localtion[l])
          let layerDb = new Set(localtionDb
                                .filter(d => d.layer.toString() === l)
                                .map(d => d._id.toString())
                               )

          let [errsOfReal, errsOfDb] = checkHelp.diffBetweenTwoSets(layer, layerDb)
          let errs = Array.from(checkHelp.Union(errsOfReal, errsOfDb))
          errinfos = errinfos.concat(errs.map(e => ({
            fixed: false,//修复完成	Boolean	false	是否修复完成
            error_code: 1, //错误码	Number	1	1位置错误2无法识别
            create_date: Date.now(), //错误创建时间	Date	now
            repository: id, //仓库id	Number	required
            location: l_id,//位置id	Number	required
            layer: l,//层	Number	required
            material: ObjectId(e),
            image: "/sdafasdf",
          })))
        }
      }

      return errorinfo.insertMany(errinfos)
    })
    .then(docs => {
      let tks = docs.map(d => ({
        action: 601,
        staff: null,
        status: 0,
        migration: null,
        error: d._id,
        publish_time: Date.now(),
        start_time: null,
        end_time: null,
        remark: null
      }))

      return task.insertMany(tks)
    })
    .then(tks => {
      return res.json(tks)
    })
    .catch(err => {
      res.status(400).json({ error: err })
    })
})

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
  let page = req.query.page ? parseInt(req.query.page) : 0
  let size = req.query.limit ? parseInt(req.query.limit) : 10
  let others = req.query.others ? JSON.parse(req.query.others) : []

  return Promise.resolve()
    .then(() => {
      let query = findHelp.findByQuery(errorinfo, others)
      query = findHelp.slicePage(query, page, size)
      return query
    })
    .then(es => res.status(200).json(es))
    .catch(err => {
      res.status(400).json({ error: JSON.stringify(err) })
    })
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
