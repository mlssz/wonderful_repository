let express = require("express")
let router = express.Router()
let materials = require("../models/material")
let migrations = require("../models/migration")
let task = require("../models/task")
let repository = require("../models/repository")
let errorinfo = require("../models/errorinfo")
let exportinfo = require("../models/exportinfo")
let findHelp = require("../libs/find_helpers.js")
let mongoose = require("mongoose")
let ObjectId = mongoose.Types.ObjectId
exports.router = router
exports.path = "/"

// 查看物品移动记录数量
router.get("/material/migrations", (req, res) => {
  migrations.count(null, (err, num) => {
    if (err) {
      res.status(400).json({ error: err })
    } else {
      res.status(200).json({ num: num })
    }
  })
})
/*根据id获取一个特定的物资的基本详细信息*/
router.get("/material/id/:id/", (req, res, next) => {
  var id = Number.parseInt(req.params.id)

  return Promise.resolve()
    .then(() => materials.findOne({ id: id }))
    .then(doc => {
      if (doc != null) {
        res.json(doc)
      } else {
        res.status(404).end()
      }
    })
    .catch(() => {
      res.status(404).end()
    })
})

/*获取一个特定的物资的基本详细信息*/
router.get("/material/:id/", (req, res, next) => {
  var id = req.params.id

  return Promise.resolve()
    .then(() => materials.findOne({ _id: ObjectId(id) }))
    .then(doc => {
      if (doc != null) {
        res.json(doc)
      } else {
        res.status(404).end()
      }
    })
    .catch(() => {
      res.status(404).end()
    })
})
/*修改物资的部分信息*/
router.patch("/material/:id/", (req, res, next) => {
  var id = req.params.id
  if (id !== null) {
    materials.updateOne({ _id: ObjectId(id) }, req.body, (err, raw) => {
      if (err) {
        handleError(err)
        res.status(400).json({ error: err });
      } else {
        if (raw.ok == 1) {
          res.status(200).json({})
        } else {
          res.status(400).json({ error: "记录修改失败" })
        }
      }
    })
  } else {
    res.status(404).json({ error: "ID不符合要求" })
  }
})

/*删除特定物资*/
router.delete("/material/:id", (req, res, next) => {
  var id = req.params.id

  return Promise.resolve()
    .then(() => materials.findOne({ _id: ObjectId(id) }))
    .then((doc) => {
      if (doc === null) return res.status(200).json({})

      return materials
        .deleteOne({ _id: ObjectId(id) })
        .then(() => Promise.all([
          migrations.find({ material: ObjectId(id) }),
          errorinfo.find({ material: ObjectId(id) }),
        ]))
        .then((results) => {
          return Promise.all([
            migrations.deleteMany({ material: ObjectId(id) }),
            task.deleteMany({
              $or: [
                { migration: { $in: results[0].map(r => r._id) } },
                { errorinfo: { $in: results[1].map(r => r._id) } },
              ]
            }),
            exportinfo.deleteMany({ material: ObjectId(id) }),
            errorinfo.deleteMany({ material: ObjectId(id) }),
          ])
        })
        .then(() => repository.findOne({ id: doc.repository_id }))
        .then((repo) => {
          if (repo === null) return

          let lid = doc.location_id - 1
          let yid = doc.layer

          return repo.update({
            $inc: {
              "available_space": 1,
              "stored_count": -1,
              [`locations.${lid}.available_space`]: 1,
              [`locations.${lid}.materials_num.${yid}`]: -1
            }
          })
        })
        .then(() => res.status(200).json({}))
        .catch((err) => res.status(400).json({ error: JSON.parse(err) }))
    })
    .catch(() => {
      res.status(404).end()
    })
})

/*查看一个物品的移动记录*/
router.get("/material/:id/migrations", (req, res) => {
  let id = req.params.id
  let page = parseInt(req.query.page)
  let size = parseInt(req.query.limit)
  if (id == null) {
    res.status(400).json({ error: "参数不合要求" })
  } else {
    migrations.find({ material: ObjectId(id) }, null, { skip: page * size, limit: size }, (err, docs) => {
      if (err) {
        res.status(400).json({ error: err })
      } else {
        if (docs == null || docs.length < 1) {
          res.status(400).json({ error: "没有找到相关记录" })
        } else {
          res.status(200).json(docs)
        }
      }
    })
  }
})

/*取消移动物资*/
router.get("/material/:id/migration/:mid", (req, res, next) => {
  let maid = req.params.id;
  let miid = req.params.mid;
  if (maid == null || miid == null) {
    res.status(400).json({ error: "参数不合要求" })
  } else {
    task.findOne({ migration: ObjectId(miid) }, (err, doc) => {
      if (err) {
        res.status(400).json({ error: err })
      } else {
        if (doc == null) {
          res.status(400).json({ error: "没有相关记录" })
        } else {
          if (doc.status == 100) {
            materials.updateOne({ _id: ObjectId(maid) }, { status: 100 }, (err, raw) => {
              if (err) {
                res.status(400).json({ error: err })
              } else {
                res.status(200).json({ raw: raw })
              }
            })
          } else {
            res.status(400).json({ error: "任务已经开始" })
          }
        }
      }
    })
  }
})

// 查看一个物品的移动记录
router.get("/material/:id/migrations", (req, res) => {
  let id = req.params.id
  let page = parseInt(req.query.page)
  let size = parseInt(req.query.limit)
  if (id == null || id.length != 24) {
    res.status(400).json({ error: "ID不符合要求" })
  } else {
    migrations.find({ material: id }, null, { skip: page * size, limit: size }, (err, ms) => {
      if (err) {
        res.status(400).json({ error: err })
      } else {
        if (ms == null || ms.length < 1) {
          res.status(400).json({ error: "没有找到相关记录" })
        } else {
          res.status.json(ms)
        }
      }
    })
  }
})

// 移动物资到新位置
router.post("/material/:id/migrations", (req, res) => {
  let id = req.params.id
  let repository_id = parseInt(req.body.repository)
  let location = parseInt(req.body.location)
  let layer = parseInt(req.body.layer)
  let destination = req.body.destination

  materials.findOne({ _id: ObjectId(id) }, (err, doc) => {
    if (err) {
      res.status(400).json({ error: err })
    } else {
      if (doc == null) {
        res.status(400).json({ error: "该物品不存在" })
      } else {
        if (repository_id == -1) {
          let mi = {
            material: ObjectId(id),
            date: 0,
            from_repository: doc.repository_id,
            from_location: doc.location_id,
            from_layer: doc.layer,
            to_repository: -1,
            to_location: 0,
            to_layer: 0
          }
          let ta = {
            action: 502,
            staff: null,
            status: 0,
            migration: null,
            error: null,
            publish_time: Date.now(),
            start_time: null,
            end_time: null,
            remark: null
          }
          let ei = {
            actual_export_time: Date.now(),
            material: ObjectId(id),
            destination: destination,
            from_repository: doc.repository_id
          }
          migrations.insertMany([mi], (err, docs) => {
            if (err) {
              res.status(400).json({ error: err })
            } else {
              mi = docs[0]
              if (mi == null) {
                res.status(400).json({ error: "失败" })
              } else {
                ta.migration = docs[0]._id
                task.insertMany([ta], (err, docs) => {
                  if (err) {
                    res.status(400).json({ error: err })
                  } else {
                    if (docs[0] != null) {
                      exportinfo.insertMany([ei], (err, docs) => {
                        if (err) {
                          res.status(400).json({ error: err })
                        } else {
                          if (docs[0] != null) {
                            mi.exportinfo = {
                              distination: destination
                            }
                            materials.updateOne({ _id: ObjectId(id) }, { status: 302 }, (err, raw) => {
                              if (err) {
                                res.status(400).json({ error: err })
                              } else {
                                if (raw.n == 1 && raw.nModified == 1 && raw.ok == 1)
                                  res.status(200).json(mi)
                                else
                                  res.status(400).json({ error: "更新物品状态失败" })
                              }
                            })
                          } else {
                            res.status(400).json({ error: "失败" })
                          }
                        }
                      }).catch((err) => {
                        res.status(400).json({ error: err })
                      })
                    } else {
                      res.status(400).json({ error: "失败" })
                    }
                  }
                }).catch((err) => {
                  res.status(400).json({ error: err })
                })
              }
            }
          }).catch((err) => {
            res.status(400).json({ error: err })
          })
        } else {
          repository.findOne({ id: repository_id }, (err, docs) => {
            if (err) {
              res.status(400).json({ error: err })
            } else {
              if (docs != null) {
                docs = docs.toObject()
                if (docs.locations[location].materials_num[layer] <= 20) {
                  let mi = {
                    material: ObjectId(id),
                    date: 0,
                    from_repository: doc.repository_id,
                    from_location: doc.location_id,
                    from_layer: doc.layer,
                    to_repository: repository_id,
                    to_location: location,
                    to_layer: layer
                  }
                  let ta = {
                    action: 501,
                    staff: null,
                    status: 0,
                    migration: null,
                    error: null,
                    publish_time: Date.now(),
                    start_time: 0,
                    end_time: 0,
                    remark: null
                  }
                  migrations.insertMany([mi], (err, docm) => {
                    if (err) {
                      res.status(400).json({ error: err })
                    } else {
                      docm = docm[0]
                      ta.migration = docm._id
                      task.insertMany([ta], (err, doc) => {
                        if (err) {
                          res.status(400).json({ error: err })
                        } else {
                          docs.available_space -= 1
                          docs.stored_count += 1
                          docs.locations[location].available_space -= 1
                          docs.locations[location].materials_num[layer] += 1
                          repository.updateOne({ id: repository_id }, { $set: docs }, (err, raw) => {
                            if (err) {
                              res.status(400).json({ error: err })
                            } else {
                              if (raw.ok == 1) {
                                materials.updateOne({ _id: ObjectId(id) }, { status: 301 }, (err, raw) => {
                                  if (err) {
                                    res.status(400).json({ error: err })
                                  } else {
                                    docm.exportinfo = {
                                      "distination": destination
                                    }
                                    if (raw.n == 1 && raw.nModified == 1 && raw.ok == 1)
                                      res.status(200).json({ docm })
                                    else
                                      res.status(400).json({ error: "更新物品状态失败" })
                                  }
                                })
                              } else {
                                res.status(400).json({ error: "记录修改失败" })
                              }
                            }
                          })
                        }
                      }).catch((err) => {
                        res.status(400).json({ error: err })
                      })
                    }
                  }).catch((err) => {
                    res.status(400).json({ error: err })
                  })
                } else {
                  res.status(400).json({ error: "该层已被放满" })
                }
              } else {
                res.status(400).json({ error: "仓库不存在" })
              }
            }
          })
        }
      }
    }
  })

})

// 录入多个物资
router.post("/materials", (req, res) => {
  let type = req.body.type
  let description = req.body.description
  let import_time = Date.now()
  let estimated_export_time = Date.now()
  let height = parseInt(req.body.height)
  let width = parseInt(req.body.width)
  let length = parseInt(req.body.length)
  let repository_id = parseInt(req.body.repository_id)
  let location_id = parseInt(req.body.location_id)
  let layer = parseInt(req.body.layer)
  let num = parseInt(req.body.num)
  repository.findOne({ id: repository_id }, (err, repo) => {
    if (err) {
      res.status(400).json({ error: err })
    } else {
      repo = repo.toObject()
      if ((repo.locations[location_id].materials_num[layer] < 20) && ((20 - repo.locations[location_id].materials_num[layer]) >= num)) {
        repo.available_space -= num
        repo.stored_count += num
        repo.locations[location_id].available_space -= num
        repo.locations[location_id].materials_num[layer] += num
        let up = {}
        up["available_space"] = repo.available_space
        up["stored_count"] = repo.stored_count
        up["locations." + location_id + ".available_space"] = repo.locations[location_id].available_space
        up["locations." + location_id + ".materials_num"] = repo.locations[location_id].materials_num
        repository.updateOne({ _id: ObjectId(repo._id) }, { $set: up }, (err, raw) => {
          if (err) {
            res.status(400).json({ error: err })
          } else {
            if (raw.n == 1) {
              if (raw.nModified == 1) {
                if (raw.ok == 1) {
                  let ms = []
                  for (let i = 0; i < num; i++) {
                    let m = {
                      type: type,
                      description: description,
                      import_time: import_time,
                      estimated_export_time: estimated_export_time,
                      height: height,
                      width: width,
                      length: height,
                      repository_id: repository_id,
                      location_id: location_id,
                      layer: layer,
                      status: 300,
                      last_migration: null,
                      location_update_time: null
                    }
                    ms.push(m)
                  }
                  materials.insertMany(ms, (err, mater) => {
                    if (err) {
                      res.status(400).json({ error: err })
                    } else {
                      let p = new Promise((resolve, reject) => {
                        let mi = []
                        for (let i = 0; i < num; i++) {
                          mi.push(
                            {
                              material: mater[i]._id,
                              date: null,
                              from_repository: 0,
                              from_location: 0,
                              from_layer: 0,
                              to_repository: repository_id,
                              to_location: location_id,
                              to_layer: layer
                            }
                          )
                        }

                        migrations.insertMany(mi, (err, migra) => {
                          if (err) {
                            reject(err)
                          } else {
                            resolve(migra)
                          }
                        }).catch((err) => {
                          res.status(400).json({ error: err })
                        })
                      })
                      p.then((migra) => {
                        let ta = []
                        for (let k = 0; k < migra.length; k++) {
                          ta.push({
                            action: 500,
                            staff: null,
                            status: 0,
                            migration: migra[k]._id,
                            error: null,
                            publish_time: Date.now(),
                            start_time: null,
                            end_time: null,
                            remark: null
                          })
                        }
                        task.insertMany(ta, (err, doc) => {
                          if (err) {
                            res.status(400).json({ error: err })
                          } else {
                            res.status(201).json(mater)
                          }
                        })
                      })
                    }
                  }).catch((err) => {
                    console.log(err)
                  })
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

      } else {
        res.status(400).json({ error: "空间大小不够" })
      }
    }
  })
})

router.head("/materials", (req, res) => {
  let others = req.query.others ? JSON.parse(req.query.others) : []
  others = findHelp.findByQuery(materials, others)
  others.count((err, num) => {
    if (err) {
      res.status(400).json({ error: err })
    } else {
      res.status(200).append("num", num).end()
    }
  }).catch((err) => { res.status(400).json({ error: err }) })
})

router.get("/materials", (req, res) => {
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.limit)
  var query = req.query.others
  if (query == null) {
    materials.find({}, null, { limit: size, skip: size * page }, (err, docs) => {
      if (err) {
        res.status(400).json({ error: JSON.stringify(err) })
      } else {
        if (docs == null || docs.length < 1) {
          res.status(200).json([])
        } else {
          res.status(200).json(docs)
        }
      }
    })
  } else {
    query = findHelp.findByQuery(materials, JSON.parse(query));
    query = findHelp.slicePage(query, page, size)
    query.exec().then((result) => {
      if (result == null || result.length < 1) {
        res.status(200).json([])
      } else {
        res.status(200).json(result)
      }
    }).catch((err) => {
      res.status(400).json({ error: JSON.stringify(err) })
    })
  }
})

/*删除所有物资*/Promise
router.delete("/materials", (req, res) => {
  let hand = new Promise((resolve, reject) => {
    materials.deleteMany({}, (err) => {
      if (err) {
        res.status(400).json({ error: err })
      } else {
        resolve()
      }
    })
  })
  hand.then(() => {
    return new Promise((resolve, reject) => {
      task.deleteMany({}, (err) => {
        if (err) {
          res.status(400).json({ error: err })
        } else {
          resolve()
        }
      })
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      migrations.deleteMany({}, (err) => {
        if (err) {
          res.status(400).json({ error: err })
        } else {
          resolve()
        }
      })
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      errorinfo.deleteMany({}, (err) => {
        if (err) {
          res.status(400).json({ error: err })
        } else {
          resolve()
        }
      })
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      repository.find({}, (err, docs) => {
        if (err) {
          res.status(400).json({ error: err })
        } else {
          if (docs == null || docs.length < 1) {
            resolve()
          } else {
            docs = docs.toObject()
            for (let i in docs) {
              let b = docs[i]
              b.stored_count = 0
              b.available_space = 2640
              for (let j in b.locations) {
                b.locations[j].available_space = 60
                b.locations[j].materials_num = [
                  1.0,
                  1.0,
                  1.0
                ]
              }
            }
            repository.insertMany(docs, (err, docs) => {
              if (err) {
                res.status(400).json({ error: err })
              } else {
                resolve()
              }
            })
          }
        }
      })
    })
  }).then(() => {
    exportinfo.deleteMany({}, (err) => {
      if (err) {
        res.status(400).json({ error: err })
      } else {
        res.status(200).json({})
      }
    })
  }).catch((err) => {
    res.status(400).json({ error: err })
  })
})

router.head("/repository/:id/materials", (req, res) => {
  let id = parseInt(req.params.id)
  let others = req.query.others
  let con = { repository_id: id }
  for (let i in others) {
    con[i] = others[i]
  }
  materials.count({ repository_id: id }, (err, count) => {
    if (err) {
      res.status(400).json({ error: err })
    } else {
      res.status(200).append("num", count).end()
    }
  })
})

router.get("/repository/:id/materials", (req, res) => {
  let id = parseInt(req.params.id)
  let page = parseInt(req.query.page)
  let size = parseInt(req.query.limit)
  let others = req.query.others
  if (query == null) {
    materials.find({ repository_id: id }, null, { limit: size, skip: size * page }, (err, docs) => {
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
    others = findHelp.findByQuery(materials, others);
    others = findHelp.slicePage(others, page, size)
    others.exec().then((result) => {
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

router.head("/repository/:rid/location/:lid/materials", (req, res) => {
  let rid = parseInt(req.params.rid)
  let lid = parseInt(req.params.lid)
  let others = req.query.others
  let con = {
    repository_id: rid,
    location_id: lid
  }
  for (let i in others) {
    con[i] = others[i]
  }
  materials.count(con, (err, num) => {
    if (err) {
      res.status(400).json({ error: err })
    } else {
      res.status(200).append("num", num).end()
    }
  })
})

router.get("/repository/:rid/location/:lid/materials", (req, res) => {
  let rid = parseInt(req.params.rid)
  let lid = parseInt(req.params.lid)
  let page = parseInt(req.query.page)
  let size = parseInt(req.query.limit)
  let others = req.query.others
  let con = {
    repository_id: rid,
    location_id: lid
  }
  for (let i in others) {
    con[i] = others[i]
  }
  others = findHelp.findByQuery(materials, con);
  others = findHelp.slicePage(others, page, size)
  others.exec().then((result) => {
    if (result == null || result.length < 1) {
      res.status(400).json({ error: "没有找到记录" })
    } else {
      res.status(200).json(result)
    }
  }).catch((err) => {
    res.status(400).json({ error: JSON.stringify(err) })
  })
})
