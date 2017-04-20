let errorinfo = require("../models/errorinfo")
let exportino = require("../models/exportinfo")
let material = require("../models/material")
let migration = require("../models/migration")
let repository = require("../models/repository")
let staff = require("../models/staff")
let task = require("../models/task")
let mongoose = require("mongoose")
let Schema = mongoose.Schema
let ObjectId = Schema.ObjectId

let data = {
    errorinfo: [
        { fixed: false, error_code: 1, repository: null, location: 1, layer: 1, material: 1, image: "/url" }
    ],
    exportinfo: [
        { actual_export_time: Date.now(), material: null, destination: "去该去的地方", from_repository: 1 }
    ],
    material: [
        { id: 1, type: 0, description: "A", import_time: Date.now(), estimated_export_time: Date.now(), height: 1, length: 1, width: 1, repository_id: 1, location_id: 1, layer: 1, status: 300, last_migration: null, location_update_time: Date.now() },
        { id: 2, type: 0, description: "B", import_time: Date.now(), estimated_export_time: Date.now(), height: 1, length: 1, width: 1, repository_id: 1, location_id: 1, layer: 1, status: 300, last_migration: null, location_update_time: Date.now() },
        { id: 3, type: 0, description: "C", import_time: Date.now(), estimated_export_time: Date.now(), height: 1, length: 1, width: 1, repository_id: 1, location_id: 1, layer: 1, status: 300, last_migration: null, location_update_time: Date.now() },
        { id: 4, type: 0, description: "D", import_time: Date.now(), estimated_export_time: Date.now(), height: 1, length: 1, width: 1, repository_id: 1, location_id: 1, layer: 1, status: 300, last_migration: null, location_update_time: Date.now() },
        { id: 5, type: 0, description: "E", import_time: Date.now(), estimated_export_time: Date.now(), height: 1, length: 1, width: 1, repository_id: 1, location_id: 1, layer: 1, status: 300, last_migration: null, location_update_time: Date.now() },
        { id: 6, type: 0, description: "F", import_time: Date.now(), estimated_export_time: Date.now(), height: 1, length: 1, width: 1, repository_id: 1, location_id: 1, layer: 1, status: 300, last_migration: null, location_update_time: Date.now() }
    ],
    migration: [
        { material: null, date: null, from_repository: 1, from_location: 1, from_layer: 1, to_repository: 2, to_location: 1, to_layer: 1 }
    ],
    repository: [
        { id: 1, available_space: 2640, locations: [{ id: 1, place: 1, label: "HAHA", available_space: 60, materials_num: [0, 0, 0] }], stored_count: 0 }
    ],
    staff: [
        { name: "佚名", account: "100000", passwd: "123456", sex: 0, age: 18, permission: 0, signup_time: Date.now(), last_login_time: Date.now() },
        { name: "群星", account: "100001", passwd: "123456", sex: 0, age: 18, permission: 0, signup_time: Date.now(), last_login_time: Date.now() },
        { name: "小明", account: "100002", passwd: "123456", sex: 0, age: 18, permission: 1, signup_time: Date.now(), last_login_time: Date.now() },
        { name: "小李", account: "100003", passwd: "123456", sex: 0, age: 18, permission: 1, signup_time: Date.now(), last_login_time: Date.now() },
        { name: "小王", account: "100004", passwd: "123456", sex: 0, age: 18, permission: 1, signup_time: Date.now(), last_login_time: Date.now() },
        { name: "小狗", account: "100005", passwd: "123456", sex: 0, age: 18, permission: 1, signup_time: Date.now(), last_login_time: Date.now() },
        { name: "小猫", account: "100006", passwd: "123456", sex: 0, age: 18, permission: 1, signup_time: Date.now(), last_login_time: Date.now() }
    ],
    task: [
        { action: 500, staff: null, status: 0, migration: null, error: null, publish_time: Date.now(), start_time: Date.now(), end_time: Date.now(), remark: null },
        { action: 501, staff: null, status: 0, migration: null, error: null, publish_time: Date.now(), start_time: Date.now(), end_time: Date.now(), remark: null },
        { action: 502, staff: null, status: 0, migration: null, error: null, publish_time: Date.now(), start_time: Date.now(), end_time: Date.now(), remark: null },
        { action: 601, staff: null, status: 0, migration: null, error: null, publish_time: Date.now(), start_time: Date.now(), end_time: Date.now(), remark: null },
        { action: 602, staff: null, status: 0, migration: null, error: null, publish_time: Date.now(), start_time: Date.now(), end_time: Date.now(), remark: null }
    ]
}

function log(msg) {
    console.log(msg);
}

//删除原有数据

repository.deleteMany({}, function (err) {
    if (err) {
        log(err)
    } else {
        log("delete all repository")
        repository.insertMany(data.repository, function (err, docs) {
            if (err) {
                log(err)
            } else {
                log(docs)
            }
        })
    }
})

material.deleteMany({}, function (err) {
    if (err) {
        log(err)
    } else {
        log("delete all material")
        material.insertMany(data.material, function (err, docs) {
            if (err) {
                log(err)
            } else {
                log(docs)
            }
        })
    }
})

staff.deleteMany({}, function (err) {
    if (err) {
        log(err)
    } else {
        log("delete all staff")
        staff.insertMany(data.staff, function (err, docs) {
            if (err) {
                log(err)
            } else {
                log(docs)
            }
        })
    }
})