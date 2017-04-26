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
    errorinfo: [
        { fixed: false, error_code: 1, repository: null, location: 1, layer: 1, material: 1, image: "/url" }
    ],
    exportinfo: [
        { actual_export_time: Date.now(), material: null, destination: "去该去的地方", from_repository: 1 }
    ],
    material: [
        { "_id": ObjectId("58fd9393c759b42871a40658"), "__v": 0, "type": "0", "estimated_export_time": ISODate("2017-04-24T05:56:34.590Z"), "repository_id": ObjectId("58fd9e42de48e42d23c6c37d"), "location_id": 1, "layer": 1, "last_migration": null, "location_update_time": ISODate("2017-04-24T05:56:34.590Z"), "status": 300, "width": 1, "length": 1, "height": 1, "import_time": ISODate("2017-04-24T05:56:34.590Z"), "description": "A", "id": 1 }
    ],
    migration: [
        { material: null, date: null, from_repository: 1, from_location: 1, from_layer: 1, to_repository: 2, to_location: 1, to_layer: 1 }
    ],
    repository: [
        { "_id": ObjectId("58fd9e42de48e42d23c6c37d"), "__v": 0, "id": 1, "locations": [{ "id": 1, "label": "17", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c3a9"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 2, "label": "18", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c3a8"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 3, "label": "19", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c3a7"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 4, "label": "20", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c3a6"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 5, "label": "21", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c3a5"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 6, "label": "22", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c3a4"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 7, "label": "23", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c3a3"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 8, "label": "24", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c3a2"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 9, "label": "25", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c3a1"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 10, "label": "26", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c3a0"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 11, "label": "27", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c39f"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 12, "label": "28", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c39e"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 13, "label": "29", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c39d"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 14, "label": "30", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c39c"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 15, "label": "31", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c39b"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 16, "label": "32", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c39a"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 17, "label": "33", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c399"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 18, "label": "34", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c398"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 19, "label": "35", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c397"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 20, "label": "36", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c396"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 21, "label": "37", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c395"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 22, "label": "38", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c394"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 23, "label": "39", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c393"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 24, "label": "40", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c392"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 25, "label": "41", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c391"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 26, "label": "42", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c390"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 27, "label": "43", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c38f"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 28, "label": "44", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c38e"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 29, "label": "1", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c38d"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 30, "label": "2", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c38c"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 31, "label": "3", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c38b"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 32, "label": "4", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c38a"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 33, "label": "5", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c389"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 34, "label": "6", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c388"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 35, "label": "6", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c387"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 36, "label": "5", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c386"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 37, "label": "4", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c385"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 38, "label": "3", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c384"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 39, "label": "2", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c383"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 40, "label": "1", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c382"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 41, "label": "16", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c381"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 42, "label": "15", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c380"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 43, "label": "14", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c37f"), "materials_num": [0, 0, 0], "avalibale_space": 60 }, { "id": 44, "label": "13", "available_space": 60, "_id": ObjectId("58fd9e42de48e42d23c6c37e"), "materials_num": [0, 0, 0], "avalibale_space": 60 }], "stored_count": 0, "available_space": 2640 }
    ],
    staff: [
        { "_id": ObjectId("58fd60e7213cc61e26ecf9ce"), "__v": 0, "account": "100000", "passwd": "123456", "last_login_time": ISODate("2017-04-24T02:20:21.898Z"), "signup_time": ISODate("2017-04-24T02:20:21.898Z"), "permission": 0, "age": 18, "sex": 0, "name": "佚名" }, { "_id": ObjectId("58fd60e7213cc61e26ecf9cf"), "__v": 0, "account": "100001", "passwd": "123456", "last_login_time": ISODate("2017-04-24T02:20:21.898Z"), "signup_time": ISODate("2017-04-24T02:20:21.898Z"), "permission": 0, "age": 18, "sex": 0, "name": "群星" }, { "_id": ObjectId("58fd60e7213cc61e26ecf9d0"), "__v": 0, "account": "100002", "passwd": "123456", "last_login_time": ISODate("2017-04-24T02:20:21.898Z"), "signup_time": ISODate("2017-04-24T02:20:21.898Z"), "permission": 1, "age": 18, "sex": 0, "name": "小明" }, { "_id": ObjectId("58fd60e7213cc61e26ecf9d1"), "__v": 0, "account": "100003", "passwd": "123456", "last_login_time": ISODate("2017-04-24T02:20:21.898Z"), "signup_time": ISODate("2017-04-24T02:20:21.898Z"), "permission": 1, "age": 18, "sex": 0, "name": "小李" }, { "_id": ObjectId("58fd60e7213cc61e26ecf9d2"), "__v": 0, "account": "100004", "passwd": "123456", "last_login_time": ISODate("2017-04-24T02:20:21.898Z"), "signup_time": ISODate("2017-04-24T02:20:21.898Z"), "permission": 1, "age": 18, "sex": 0, "name": "小王" }, { "_id": ObjectId("58fd60e7213cc61e26ecf9d3"), "__v": 0, "account": "100005", "passwd": "123456", "last_login_time": ISODate("2017-04-24T02:20:21.898Z"), "signup_time": ISODate("2017-04-24T02:20:21.898Z"), "permission": 1, "age": 18, "sex": 0, "name": "小狗" }, { "_id": ObjectId("58fd60e7213cc61e26ecf9d4"), "__v": 0, "account": "100006", "passwd": "123456", "last_login_time": ISODate("2017-04-24T02:20:21.898Z"), "signup_time": ISODate("2017-04-24T02:20:21.898Z"), "permission": 1, "age": 18, "sex": 0, "name": "小猫" }
    ],
    task: [
        { "_id": ObjectId("58fd60e6213cc61e26ecf9c6"), "__v": 0, "type": "0", "estimated_export_time": ISODate("2017-04-24T02:20:21.898Z"), "repository_id": 1, "location_id": 1, "layer": 1, "last_migration": null, "location_update_time": ISODate("2017-04-24T02:20:21.898Z"), "status": 300, "width": 1, "length": 1, "height": 1, "import_time": ISODate("2017-04-24T02:20:21.898Z"), "description": "A", "id": 1 }, { "_id": ObjectId("58fd60e6213cc61e26ecf9c7"), "__v": 0, "type": "0", "estimated_export_time": ISODate("2017-04-24T02:20:21.898Z"), "repository_id": 1, "location_id": 1, "layer": 1, "last_migration": null, "location_update_time": ISODate("2017-04-24T02:20:21.898Z"), "status": 300, "width": 1, "length": 1, "height": 1, "import_time": ISODate("2017-04-24T02:20:21.898Z"), "description": "B", "id": 2 }, { "_id": ObjectId("58fd60e6213cc61e26ecf9c8"), "__v": 0, "type": "0", "estimated_export_time": ISODate("2017-04-24T02:20:21.898Z"), "repository_id": 1, "location_id": 1, "layer": 1, "last_migration": null, "location_update_time": ISODate("2017-04-24T02:20:21.898Z"), "status": 300, "width": 1, "length": 1, "height": 1, "import_time": ISODate("2017-04-24T02:20:21.898Z"), "description": "C", "id": 3 }, { "_id": ObjectId("58fd60e6213cc61e26ecf9c9"), "__v": 0, "type": "0", "estimated_export_time": ISODate("2017-04-24T02:20:21.898Z"), "repository_id": 1, "location_id": 1, "layer": 1, "last_migration": null, "location_update_time": ISODate("2017-04-24T02:20:21.898Z"), "status": 300, "width": 1, "length": 1, "height": 1, "import_time": ISODate("2017-04-24T02:20:21.898Z"), "description": "D", "id": 4 }, { "_id": ObjectId("58fd60e6213cc61e26ecf9ca"), "__v": 0, "type": "0", "estimated_export_time": ISODate("2017-04-24T02:20:21.898Z"), "repository_id": 1, "location_id": 1, "layer": 1, "last_migration": null, "location_update_time": ISODate("2017-04-24T02:20:21.898Z"), "status": 300, "width": 1, "length": 1, "height": 1, "import_time": ISODate("2017-04-24T02:20:21.898Z"), "description": "E", "id": 5 }, { "_id": ObjectId("58fd60e6213cc61e26ecf9cb"), "__v": 0, "type": "0", "estimated_export_time": ISODate("2017-04-24T02:20:21.898Z"), "repository_id": 1, "location_id": 1, "layer": 1, "last_migration": null, "location_update_time": ISODate("2017-04-24T02:20:21.898Z"), "status": 300, "width": 1, "length": 1, "height": 1, "import_time": ISODate("2017-04-24T02:20:21.898Z"), "description": "F", "id": 6 }
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
        // let n = [17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,1,2,3,4,5,6,6,5,4,3,2,1,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]
        // let m = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
        // let ls = []
        // for (let i = 1; i <= 44; i++) {
        //     ls.push({id:i,place:m[i-1],label:n[i-1],available_space:60,materials_num:[0,0,0]})
        // }
        // data.repository.locations = ls
        // console.log(data.repository.locations)
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