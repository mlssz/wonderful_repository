/* test_query.js --- test query data according to url query
 *
 * Maintainer: Mephis Pheies ( MephistoMMM )
 * Email: mephistommm@gmail.com
 *
 * License:
 * MIT License
 */
const expect = require("chai").expect
let Repository = require("../models/repository.js")
let Material = require("../models/material.js")
let Errorinfo = require("../models/errorinfo.js")
let Task = require("../models/task.js")
let Migration = require("../models/migration.js")
let request = require("supertest")

let ObjectId = require("mongoose").Types.ObjectId
let app = require("../app.js")

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
    location_id: 1,
    layer: 1,
  },
  {
    type: "Test5",
    id: 5,
    description: "test5",
    repository_id: 1,
    location_id: 1,
    layer: 1,
  },
  {
    type: "Test6",
    id: 6,
    description: "test6",
    repository_id: 1,
    location_id: 1,
    layer: 1,
  }
]

describe("Check Result", () => {
  describe("#create check result", () => {
    let mids
    let body = {1: {0: [], 1: []}}
    before(() => {
      let create_material = Promise.all([
        Material.deleteMany({}).exec(),
        Task.deleteMany({}).exec(),
        Repository.deleteMany({}).exec(),
        Errorinfo.deleteMany({}).exec(),
        Migration.deleteMany({}).exec(),
          ])
          .then(() => Material.create(tests))
          .then(docs => {
            mids = docs.map(d => d._id)
            body[1][0].push(mids[0])
            body[1][0].push(mids[1])
            body[1][0].push(mids[5])
            body[1][1].push(mids[3])
            body[1][1].push(mids[4])

            Repository.create({
              id: 1,
              available_space: 100,
              stored_count: 6,
              locations: [
                {
                  available_space: 2,
                  label: "23",
                  place: 1,
                  id: 1,
                  materials_num: [3, 3, 0]
                }
              ]
            })
          })
      return Promise.all([create_material])
    })

    it("should check data than create errors and task", () => {
      return request(app)
        .post(`/api/checkresults/1`)
        .send(body)
        .expect(200)
        .then(res => {
          let expectlist = []
          expectlist.push(
            Errorinfo.find({}).count().then((result) => {
              expect(result).to.equal(3)
            }))
          expectlist.push(
            Task.find({}).count().then((result) => {
              expect(result).to.equal(3)
            }))

          return Promise.all(expectlist)
        })
    })
  })
})
/* test_query.js ends here */
