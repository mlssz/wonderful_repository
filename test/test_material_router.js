let expect = require("chai").expect
let Repository = require("../models/repository.js")
let Material = require("../models/material.js")
let Migration = require("../models/migration.js")
let Staff = require("../models/staff.js")
let Exportinfo = require("../models/exportinfo.js")
let Errorinfo = require("../models/errorinfo.js")
let Task = require("../models/task.js")
let request = require("supertest")

let ObjectId = require("mongoose").Types.ObjectId
let app = require("../app.js")

describe("Material", () => {
  describe("#delete a special material", () => {
    let mid
    let mmid
    before(() => {
      let create_material = Promise.all([
        Material.deleteMany({}).exec(),
        Task.deleteMany({}).exec(),
        Repository.deleteMany({}).exec(),
        Migration.deleteMany({}).exec(),
          ])
          .then(() => Material.create({
            type: "Test1",
            id: 2,
            description: "test1",
            repository_id: 1,
            location_id: 1,
            layer: 0,
          }))
          .then((material) => {
            mid = material._id

              return Migration.create({
                material: mid,
                date: Date.now(),
                from_repository: 2,
                from_location: 3,
                from_layer: 0,
                to_repository: 4,
                to_location: 5,
                to_layer: 1
              }).then((mm) => {
                return Promise.all([
                  Task.create({
                    migration: mm._id
                  }),
                  Repository.create({
                    id: 1,
                    available_space: 1,
                    stored_count: 1,
                    locations: [
                      {
                        available_space: 2,
                        label: "23",
                        place: 1,
                        id: 1,
                        materials_num: [2, 2, 2]
                      }
                    ]
                  })
                ])
              })
          })
      return Promise.all([create_material])
    })

    it("should delete materials and associated items, and modify repository", () => {
      return request(app)
        .delete(`/api/material/${mid}`)
        .expect(200)
        .then(() => {
          let expectlist = []
          expectlist.push(
            Migration.find({}).count().then((result) => {
              expect(result).to.equal(0)
            }))
          expectlist.push(
            Task.find({}).count().then((result) => {
              expect(result).to.equal(0)
            }))
          expectlist.push(
            Material.find({}).count().then((result) => {
              expect(result).to.equal(0)
            }))
          expectlist.push(
            Repository.findOne({}).then((result) => {
              expect(result.available_space).to.equal(2)
              expect(result.stored_count).to.equal(0)
              expect(result.locations[0].available_space).to.equal(3)
              expect(result.locations[0].materials_num[0]).to.equal(1)
            })
          )

          return Promise.all(expectlist)
        })
    })
  })
})
