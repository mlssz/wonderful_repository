let errorinfo = require("../models/errorinfo")
let exportino = require("../models/exportinfo")
let material = require("../models/material")
let migration = require("../models/migration")
let repository = require("../models/repository")
let staff = require("../models/staff")
let task = require("../models/task")
let mongoose = require("mongoose")
let ObjectId = mongoose.Types.ObjectId

function ISODate(msg) {
  return Date.now()
}

let data = {
  errorinfo: [{
    fixed: false,
    error_code: 1,
    repository: null,
    location: 1,
    layer: 1,
    material: 1,
    image: "/url"
  }],
  exportinfo: [{
    actual_export_time: Date.now(),
    material: null,
    destination: "去该去的地方",
    from_repository: 1
  }],
  material: [
    // { "_id": ObjectId("58fd9393c759b42871a40658"), "__v": 0, "type": "0", "estimated_export_time": ISODate("2017-04-24T05:56:34.590Z"), "repository_id": 1, "location_id": 1, "layer": 1, "last_migration": null, "location_update_time": ISODate("2017-04-24T05:56:34.590Z"), "status": 300, "width": 1, "length": 1, "height": 1, "import_time": ISODate("2017-04-24T05:56:34.590Z"), "description": "A", "id": 1 }
  ],
  migration: [{
    material: null,
    date: null,
    from_repository: 1,
    from_location: 1,
    from_layer: 1,
    to_repository: 2,
    to_location: 1,
    to_layer: 1
  }],
  repository: [{
    "_id": ObjectId("58fd9e42de48e42d23c6c37d"),
    "id": 1,
    "available_space": 2640,
    "locations": [{
      "id": 1,
      "place": 1,
      "label": 17,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 2,
      "place": 1,
      "label": 18,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 3,
      "place": 1,
      "label": 19,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 4,
      "place": 1,
      "label": 20,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 5,
      "place": 1,
      "label": 21,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 6,
      "place": 1,
      "label": 22,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 7,
      "place": 1,
      "label": 23,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 8,
      "place": 1,
      "label": 24,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 9,
      "place": 1,
      "label": 25,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 10,
      "place": 1,
      "label": 26,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 11,
      "place": 1,
      "label": 27,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 12,
      "place": 1,
      "label": 28,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 13,
      "place": 1,
      "label": 29,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 14,
      "place": 1,
      "label": 30,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 15,
      "place": 1,
      "label": 31,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 16,
      "place": 1,
      "label": 32,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 17,
      "place": 2,
      "label": 1,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 18,
      "place": 2,
      "label": 2,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 19,
      "place": 2,
      "label": 3,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 20,
      "place": 2,
      "label": 4,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 21,
      "place": 2,
      "label": 5,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 22,
      "place": 2,
      "label": 6,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 23,
      "place": 3,
      "label": 6,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 24,
      "place": 3,
      "label": 5,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 25,
      "place": 3,
      "label": 4,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 26,
      "place": 3,
      "label": 3,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 27,
      "place": 3,
      "label": 2,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 28,
      "place": 3,
      "label": 1,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 29,
      "place": 4,
      "label": 16,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 30,
      "place": 4,
      "label": 15,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 31,
      "place": 4,
      "label": 14,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 32,
      "place": 4,
      "label": 13,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 33,
      "place": 4,
      "label": 12,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 34,
      "place": 4,
      "label": 11,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 35,
      "place": 4,
      "label": 10,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 36,
      "place": 4,
      "label": 9,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 37,
      "place": 4,
      "label": 8,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 38,
      "place": 4,
      "label": 7,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 39,
      "place": 4,
      "label": 6,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 40,
      "place": 4,
      "label": 5,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 41,
      "place": 4,
      "label": 4,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 42,
      "place": 4,
      "label": 3,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 43,
      "place": 4,
      "label": 2,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }, {
      "id": 44,
      "place": 4,
      "label": 1,
      "available_space": 60,
      "materials_num": [0, 0, 0]
    }],
    "stored_count": 0
  }],
  staff: [{
    "_id": ObjectId("58fd60e7213cc61e26ecf9ce"),
    "__v": 0,
    "account": "100000",
    "passwd": "123456",
    "last_login_time": ISODate("2017-04-24T02:20:21.898Z"),
    "signup_time": ISODate("2017-04-24T02:20:21.898Z"),
    "permission": 0,
    "age": 18,
    "sex": 0,
    "name": "佚名"
  }, {
    "_id": ObjectId("58fd60e7213cc61e26ecf9cf"),
    "__v": 0,
    "account": "100001",
    "passwd": "123456",
    "last_login_time": ISODate("2017-04-24T02:20:21.898Z"),
    "signup_time": ISODate("2017-04-24T02:20:21.898Z"),
    "permission": 0,
    "age": 18,
    "sex": 0,
    "name": "群星"
  }, {
    "_id": ObjectId("58fd60e7213cc61e26ecf9d0"),
    "__v": 0,
    "account": "100002",
    "passwd": "123456",
    "last_login_time": ISODate("2017-04-24T02:20:21.898Z"),
    "signup_time": ISODate("2017-04-24T02:20:21.898Z"),
    "permission": 1,
    "age": 18,
    "sex": 0,
    "name": "小明"
  }, {
    "_id": ObjectId("58fd60e7213cc61e26ecf9d1"),
    "__v": 0,
    "account": "100003",
    "passwd": "123456",
    "last_login_time": ISODate("2017-04-24T02:20:21.898Z"),
    "signup_time": ISODate("2017-04-24T02:20:21.898Z"),
    "permission": 1,
    "age": 18,
    "sex": 0,
    "name": "小李"
  }, {
    "_id": ObjectId("58fd60e7213cc61e26ecf9d2"),
    "__v": 0,
    "account": "100004",
    "passwd": "123456",
    "last_login_time": ISODate("2017-04-24T02:20:21.898Z"),
    "signup_time": ISODate("2017-04-24T02:20:21.898Z"),
    "permission": 1,
    "age": 18,
    "sex": 0,
    "name": "小王"
  }, {
    "_id": ObjectId("58fd60e7213cc61e26ecf9d3"),
    "__v": 0,
    "account": "100005",
    "passwd": "123456",
    "last_login_time": ISODate("2017-04-24T02:20:21.898Z"),
    "signup_time": ISODate("2017-04-24T02:20:21.898Z"),
    "permission": 1,
    "age": 18,
    "sex": 0,
    "name": "小狗"
  }, {
    "_id": ObjectId("58fd60e7213cc61e26ecf9d4"),
    "__v": 0,
    "account": "100006",
    "passwd": "123456",
    "last_login_time": ISODate("2017-04-24T02:20:21.898Z"),
    "signup_time": ISODate("2017-04-24T02:20:21.898Z"),
    "permission": 1,
    "age": 18,
    "sex": 0,
    "name": "小猫"
  }],
  task: [{
    "_id": ObjectId("58fd60e6213cc61e26ecf9c6"),
    "__v": 0,
    "type": "0",
    "estimated_export_time": ISODate("2017-04-24T02:20:21.898Z"),
    "repository_id": 1,
    "location_id": 1,
    "layer": 1,
    "last_migration": null,
    "location_update_time": ISODate("2017-04-24T02:20:21.898Z"),
    "status": 300,
    "width": 1,
    "length": 1,
    "height": 1,
    "import_time": ISODate("2017-04-24T02:20:21.898Z"),
    "description": "A",
    "id": 1
  }, {
    "_id": ObjectId("58fd60e6213cc61e26ecf9c7"),
    "__v": 0,
    "type": "0",
    "estimated_export_time": ISODate("2017-04-24T02:20:21.898Z"),
    "repository_id": 1,
    "location_id": 1,
    "layer": 1,
    "last_migration": null,
    "location_update_time": ISODate("2017-04-24T02:20:21.898Z"),
    "status": 300,
    "width": 1,
    "length": 1,
    "height": 1,
    "import_time": ISODate("2017-04-24T02:20:21.898Z"),
    "description": "B",
    "id": 2
  }, {
    "_id": ObjectId("58fd60e6213cc61e26ecf9c8"),
    "__v": 0,
    "type": "0",
    "estimated_export_time": ISODate("2017-04-24T02:20:21.898Z"),
    "repository_id": 1,
    "location_id": 1,
    "layer": 1,
    "last_migration": null,
    "location_update_time": ISODate("2017-04-24T02:20:21.898Z"),
    "status": 300,
    "width": 1,
    "length": 1,
    "height": 1,
    "import_time": ISODate("2017-04-24T02:20:21.898Z"),
    "description": "C",
    "id": 3
  }, {
    "_id": ObjectId("58fd60e6213cc61e26ecf9c9"),
    "__v": 0,
    "type": "0",
    "estimated_export_time": ISODate("2017-04-24T02:20:21.898Z"),
    "repository_id": 1,
    "location_id": 1,
    "layer": 1,
    "last_migration": null,
    "location_update_time": ISODate("2017-04-24T02:20:21.898Z"),
    "status": 300,
    "width": 1,
    "length": 1,
    "height": 1,
    "import_time": ISODate("2017-04-24T02:20:21.898Z"),
    "description": "D",
    "id": 4
  }, {
    "_id": ObjectId("58fd60e6213cc61e26ecf9ca"),
    "__v": 0,
    "type": "0",
    "estimated_export_time": ISODate("2017-04-24T02:20:21.898Z"),
    "repository_id": 1,
    "location_id": 1,
    "layer": 1,
    "last_migration": null,
    "location_update_time": ISODate("2017-04-24T02:20:21.898Z"),
    "status": 300,
    "width": 1,
    "length": 1,
    "height": 1,
    "import_time": ISODate("2017-04-24T02:20:21.898Z"),
    "description": "E",
    "id": 5
  }, {
    "_id": ObjectId("58fd60e6213cc61e26ecf9cb"),
    "__v": 0,
    "type": "0",
    "estimated_export_time": ISODate("2017-04-24T02:20:21.898Z"),
    "repository_id": 1,
    "location_id": 1,
    "layer": 1,
    "last_migration": null,
    "location_update_time": ISODate("2017-04-24T02:20:21.898Z"),
    "status": 300,
    "width": 1,
    "length": 1,
    "height": 1,
    "import_time": ISODate("2017-04-24T02:20:21.898Z"),
    "description": "F",
    "id": 6
  }]
}

function log(msg) {
  console.log(msg);
}

//删除原有数据
// let n = [17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,1,2,3,4,5,6,6,5,4,3,2,1,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]
// let m = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
// let ls = []
// for (let i = 1; i <= 44; i++) {
//     ls.push({id:i,place:m[i-1],label:n[i-1],available_space:60,materials_num:[0,0,0]})
// }
// data.repository.locations = ls
// console.log(data.repository.locations)

let promise = (next) => {
  new Promise((resolve, reject) => {
    log(1)
    repository.deleteMany({}, function(err) {
      if (err) {
        log(err)
      } else {
        log("delete all repository")
        repository.insertMany(data.repository, function(err, docs) {
          if (err) {
            log(err)
          } else {
            log("insert repository")
            resolve()
          }
        })
      }
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      log(2)
      material.deleteMany({}, function(err) {
        if (err) {
          log(err)
        } else {
          log("delete all material")
          material.insertMany(data.material, function(err, docs) {
            if (err) {
              log(err)
            } else {
              log("insert material")
              resolve()
            }
          })
        }
      })
    })
  }).then(() => {
    log(3)
    return new Promise((resolve, reject) => {
      task.deleteMany({}, (err) => {
        if (err) {
          reject(err)
        } else {
          migration.deleteMany({}, (err) => {
            if (err) {
              reject(err)
            } else {
              exportino.deleteMany({}, (err) => {
                if (err) {
                  reject(err)
                } else {
                  resolve()
                }
              })
            }
          })
        }
      })
    })
  }).then(() => {
    log(4)
    staff.deleteMany({}, function(err) {
      if (err) {
        log(err)
      } else {
        log("delete all staff")
        staff.insertMany(data.staff, function(err, docs) {
          if (err) {
            log(err)
          } else {
            next()
            log("insert staff")
          }
        })
      }
    })
  }).catch((err) => {
    console.log(err)
    next(err)
  })
}

exports.initdatabase = promise
