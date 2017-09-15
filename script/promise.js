let Repository = require("../models/repository.js")
let Material = require("../models/material.js")
let Errorinfo = require("../models/errorinfo.js")
let Task = require("../models/task.js")
let Migration = require("../models/migration.js")

let ObjectId = require("mongoose").Types.ObjectId

let tests = [
  {
    type: "Test1",
    id: 1,
    description: "test1",
    repository_id: 1,
    location_id: 1,
    layer: 0,
  },
  {
    type: "Test2",
    id: 2,
    description: "test2",
    repository_id: 1,
    location_id: 1,
    layer: 0,
  },
  {
    type: "Test3",
    id: 3,
    description: "test3",
    repository_id: 1,
    location_id: 1,
    layer: 0,
  },
  {
    type: "Test4",
    id: 4,
    description: "test4",
    repository_id: 1,
    location_id: 4,
    layer: 1,
  },
  {
    type: "Test5",
    id: 5,
    description: "test5",
    repository_id: 1,
    location_id: 4,
    layer: 1,
  },
  {
    type: "Test6",
    id: 6,
    description: "test6",
    repository_id: 1,
    location_id: 4,
    layer: 1,
  }
]

Promise.all([
        Material.deleteMany({}).exec(),
        Task.deleteMany({}).exec(),
        Repository.deleteMany({}).exec(),
        Errorinfo.deleteMany({}).exec(),
        Migration.deleteMany({}).exec(),
          ])
          .then(() => Material.create(tests))
  .then(() => console.log("over"))
  .catch(console.error)
