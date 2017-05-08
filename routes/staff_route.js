let express = require("express")
let router = express.Router()
let mongoose = require("mongoose")
let staff = require("../models/staff")
let findHelp = require("../libs/find_helpers")
exports.router = router
exports.path = "/"

function log(msg) {
  console.log(msg)
}

router.get("/repositories/:id/materials/", (req, res, next) => res.status(501).end())

router.get("/staff/:id", (req, res, next) => {
  var id = req.params.id;
  staff.findOne({ _id: mongoose.Types.ObjectId(id) }, function (err, doc) {
    if (err) {
      res.status(400).json({ error: err })
    } else {
      if (doc == null) {
        res.status(404).json()
      } else {
        res.status(200).json(doc)
      }
    }
  })
})

router.patch("/staff/:id", (req, res, next) => {
  var id = req.params.id;
  var conditions = req.body;
  staff.updateOne({ _id: mongoose.Types.ObjectId(id) }, conditions, function (err, raw) {
    log(raw)
    if (err) {
      res.status(400).json({ error: JSON.stringify(err) });
    } else {
      if (raw.n == 1) {
        if (raw.nModified == 1) {
          if (raw.ok == 1) {
            res.status(200).json()
          } else {
            res.status(400).json({ error: "记录修改失败" })
          }
        } else {
          res.status(400).json({ error: "修改的数据和之前一样" })
        }
      } else {
        res.status(400).json({ error: "没有找到记录" })
      }
    }
  })
})

router.delete("/staff/:id", (req, res, next) => {
  var id = req.params.id;
  staff.deleteOne({ _id: mongoose.Types.ObjectId(id) }, (err) => {
    if (err) {
      res.status(400).json({ error: JSON.stringify(err) })
    } else {
      res.status(200).json({});
    }
  })
})

router.post("/staff/auth", (req, res, next) => {
  var id = req.params.id;
  var body = req.body;
  staff.findOne({ account: body.account }, function (err, doc) {
    if (err) {
      res.status(400).json({ error: JSON.stringify(err) })
    } else {
      if (doc == null) {
        res.status(400).json({ error: "用户不存在" })
      } else {
        if (doc.passwd == body.passwd) {
          var nowt = Date.now();
          doc.last_login_time = nowt;
          doc.passwd = null;
          res.status(200).json(doc);
          req.session.user = doc;
          staff.updateOne({ _id: doc._id }, (err) => {
            if (err) {
              log(err);
            }
          })
        } else {
          res.status(400).json({ error: "密码错误" })
        }
      }
    }
  })
})

router.patch("/staff/auth/:id", (req, res, next) => {
  // if (req.session.user == null && (req.session.user._id+"") != req.params.id) {
  //   res.status(400).json({error:"安全验证失败"})
  //   return false;
  // }
  var id = req.params.id;
  var passwd = req.body.passwd;
  staff.updateOne({ _id: mongoose.Types.ObjectId(id) }, { passwd: passwd }, (err, raw) => {
    if (err) {
      res.status(400).json({ error: JSON.stringify(err) })
    } else {
      if (raw.n == 1) {
        if (raw.nModified == 1) {
          if (raw.ok == 1) {
            res.status(200).json()
          } else {
            res.status(400).json({ error: "密码修改失败" })
          }
        } else {
          res.status(400).json({ error: "修改的密码和之前一样" })
        }
      } else {
        res.status(400).json({ error: "用户不存在" })
      }
    }
  })
})

router.post("/staffs", (req, res) => {
  var oneStaff = req.body;
  var data = [];
  if (!Array.isArray(oneStaff)) {
    data.push(oneStaff);
  } else {
    data = oneStaff;
  }
  staff.insertMany(data, (err, docs) => {
    if (err) {
      res.status(200).json({ err: JSON.stringify(err) })
    } else {
      if (docs == null && docs.length < 1) {
        res.status(400).json({ error: "创建失败" })
      } else {
        res.status(200).json(docs)
      }
    }
  })
})

router.head("/staffs", (req, res) => {
  staff.count(null, (err, num) => {
    if (err) {
      res.status(400).json({ error: JSON.stringify(err) })
    } else {
      res.status(200).append("num", num).end()
    }
  })
})

router.get("/staffs", (req, res) => {
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.limit)
  var query = req.query.others
  if (query == null) {
    staff.find({}, null, { limit: size, skip: size * page }, (err, docs) => {
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
    query = findHelp.findByQuery(staff, query);
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

router.delete("/staffs", (req, res) => {
  staff.deleteMany({}, (err) => {
    if (err) {
      res.status(400).json({ error: "有错误" })
    } else {
      res.status(200).json({})
    }
  })
})

router.patch("/staffs/:id", (req, res) => {
  let sid = req.query.id
  let up = req.body
  staff.updateOne({ _id: ObjectId(sid) }, up, (err, raw) => {
    if (err) {
      res.status(400).json({ error: err })
    } else {
      if (raw.ok === 1) {
        res.status(200).json({})
      } else {
        res.status(400).json({ error: "修改失败" })
      }
    }
  })
})
