let express = require("express")
let router = express.Router()
let materials = require("../models/material")
let migrations = require("../models/migration")
let task = require("../models/task")
let mongoose = require("mongoose")
exports.router = router
exports.path = "/"

router.get("/repositories/:id/materials/", (req, res, next) => res.status(501).end())

/*获取一个特定的物资的基本详细信息*/
router.get("/material/:id/", (req, res, next) => {
  var id = Number.parseInt(req.params.id)
  if (id !== null && !isNaN(id)) {
    materials.findOne({ id: id }, (err, doc) => {
      if (err) {
        console.log(err)
        res.status(400).end({error:"数据库发生错误"})
      } else {
        if (doc != null) {
          res.json(doc)
        } else {
          res.status(404).end();
        }
      }
    })
  } else {
    res.status(404).end()
  }
})
/*修改物资的部分信息*/
router.patch("/material/:id/", (req, res, next) => {
  var id = Number.parseInt(req.params.id)
  if (id !== null && !isNaN(id)) {
    materials.updateOne({id:id}, req.body, (err, raw) => {
      if (err) {
        handleError(err)
        res.status(400).json({error:JSON.stringify(err)});
      } else {
        if (raw.n == 1) {
          if (raw.nModified == 1) {
            if (raw.ok == 1) {
              res.status(200).end()
            } else{
              res.status(400).json({error:"记录修改失败"})
            }
          } else {
            res.status(400).json({error:"修改的数据和之前一样"})
          }
        } else {
          res.status(400).json({error:"没有找到记录"})
        }
      }
    })
  } else {
    res.status(404).end()
  }
})

/*删除特定物资*/
router.delete("/material/:id", (req, res, next) => {
  var id = Number.parseInt(req.params.id)
  if (id !== null && !isNaN(id)) {
    materials.deleteOne({id:id}, (err) => {
      if (err) {
        handleError(err)
        res.status(400).json({error:JSON.parse(err)})
      } else {
        res.status(200).end()
      }
    })
  } else {
    res.status(404).end()
  }
})
/*取消移动物资*/
router.get("/material/:id/migration/:mid", (req, res, next) => {
  let id = Number.parseInt(req.params.id);
  let mid = req.params.mid;
  if (id != null && !isNaN(id) && mid != null) {
      task.findOne({migration:mongoose.Types.ObjectId(mid)},function(err,doc){
        if (err) {
          res.status(400).json({error:JSON.stringify(err)})
        } else {
          if (doc != null) {
            if (doc.status == 0) {
              
            } else {
              res.status(400).json({error:"货物已经开始移动，无法修改状态"})
            }
          } else {
            res.status(404).end("没有找到相关信息")
          }
        }
      })
  } else {
    res.status(400).json({error:"参数不匹配"})
  }
})

router.delete("/", (req, res, next) => {
  let result = req.body["value"] || "none"
  res.json({ "value": result })
})
