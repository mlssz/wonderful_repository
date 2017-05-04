let express = require("express")
let router = express.Router()
let materials = require("../models/material")
let migrations = require("../models/migration")
let task = require("../models/task")
let repository = require("../models/repository")
let errorinfo = require("../models/errorinfo")
let exportinfo = require("../models/exportinfo")
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

/*获取一个特定的物资的基本详细信息*/
router.get("/material/:id/", (req, res, next) => {
  var id = req.params.id
  if (id !== null) {
    materials.findOne({ _id: id }, (err, doc) => {
      if (err) {
        console.log(err)
        res.status(400).end({ error: "数据库发生错误" })
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
  var id = req.params.id
  if (id !== null) {
    materials.updateOne({ _id: ObjectId(id) }, req.body, (err, raw) => {
      if (err) {
        handleError(err)
        res.status(400).json({ error: err });
      } else {
        if (raw.n == 1) {
          if (raw.nModified == 1) {
            if (raw.ok == 1) {
              res.status(200).json({})
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
    res.status(404).json({ error: "ID不符合要求" })
  }
})

/*删除特定物资*/
router.delete("/material/:id", (req, res, next) => {
  var id = req.params.id
  if (id !== null) {
    materials.deleteOne({ _id: ObjectId(id) }, (err) => {
      if (err) {
        handleError(err)
        res.status(400).json({ error: JSON.parse(err) })
      } else {
        res.status(200).json({})
      }
    })
  } else {
    res.status(404).end()
  }
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
  let repository = req.body.repository
  let location = req.body.location
  let layer = req.body.layer
  let destination = req.body.destination

  materials.findOne({ _id: ObjectId(id) }, (err, doc) => {
    if (err) {
      res.status(400).json({ error: err })
    } else {
      if (doc == null) {
        res.status(400).json({ error: "该物品不存在" })
      } else {
        if (repository == -1) {
          let mi = {
            material: Objectid(id),
            date: 0,
            from_repository: doc.repository_id,
            from_location: doc.location_id,
            from_layer: doc.layer,
            to_repository: -1,
            to_location: -1,
            to_layer: -1
          }
          let ta = {
            action: 502,
            staff: null,
            status: 0,
            migration: null,
            error: null,
            publish_time: Date.now(),
            start_time: 0,
            end_time: 0,
            remark: null
          }
          let ei = {
            actual_export_time: 0,
            material: ObjectId(id),
            destination: destination,
            from_repository: doc.repository_id
          }
          migrations.insertMany([mi], (err, docs) => {
            if (err) {
              res.status(400).json({ error: err })
            } else {
              mi = docs.toObject()[0]
              if (mi == null) {
                res.status(400).json({ error: "失败" })
              } else {
                ta.migration = docs[0]._id
                ta.insertMany([ta], (err, docs) => {
                  if (err) {
                    res.status(400).json({ error: err })
                  } else {
                    if (docs[0] != null) {
                      errorinfo.insertMany([ei], (err, docs) => {
                        if (err) {
                          res.status(400).json({ error: err })
                        } else {
                          if (docs[0] != null) {
                            mi.exportinfo = {
                              distination: destination
                            }
                            res.status.json(mi)
                          } else {
                            res.status(400).json({ error: "失败" })
                          }
                        }
                      })
                    } else {
                      res.status(400).json({ error: "失败" })
                    }
                  }
                })
              }
            }
          })
        } else {
          repository.findOne({ _id: ObjectId(repository) }, (err, docs) => {
            if (err) {
              res.status(400).json({ error: err })
            } else {
              if (docs != null) {
                docs = docs.toObject()
                if (docs.locations[location].materials_num[layer] <= 20) {
                  let mi = {
                    material: Objectid(id),
                    date: 0,
                    from_repository: doc.repository_id,
                    from_location: doc.location_id,
                    from_layer: doc.layer,
                    to_repository: ObjectId(repository),
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
                  migrations.insertMany([mi], (err, doc) => {
                    if (err) {
                      res.status(400).json({ error: err })
                    } else {
                      doc = doc.toObject();
                      doc = doc[0]
                      ta.migration = doc._id
                      task.insertMany([ta], (err, doc) => {
                        if (err) {
                          res.status(400).json({ error: err })
                        } else {
                          doc.available_space -= 1
                          doc.stored_count += 1
                          doc.locations[location].available_space -= 1
                          doc.locations[location].materials_num[layer] += 1
                          repository.updateOne({ _id: ObjectId(repository) }, { $set: docs }, (err, raw) => {
                            if (err) {
                              res.status(400).json({ error: err })
                            } else {
                              if (raw.n == 1) {
                                if (raw.nModified == 1) {
                                  if (raw.ok == 1) {
                                    res.status(200).json({})
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
                        }
                      })

                    }
                  })
                } else {
                  res.status(400).json({ error: "该层已被放满" })
                }
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
                  materials.insertMany(ms, (err, docs) => {
                    if (err) {
                      res.status(400).json({ error: err })
                    } else {
                      res.status(201).json(docs)
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
  materials.count(null, (err, num) => {
    if (err) {
      res.status(400).json({ error: err })
    } else {
      res.status(200).append("num", num).end()
    }
  })
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
          res.status(400).json({ error: "没有找到相关记录" })
        } else {
          res.status(200).json(docs)
        }
      }
    })
  } else {
    query = findHelp.findByQuery(materials, query);
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