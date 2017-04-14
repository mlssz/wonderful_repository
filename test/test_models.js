/* test_models.js --- test every model
 *
 * Maintainer: Mephis Pheies ( MephistoMMM )
 * Email: mephistommm@gmail.com
 *
 * License:
 * MIT License
 *
 * Description:
 * The test framework is mocha. [https://mochajs.org/#getting-started]
 * Assertion library of testing is BDD of chai. [http://chaijs.com/guide/styles/]
 */
let expect = require("chai").expect
let Repository = require("../models/repository.js")
let Material = require("../models/material.js")
let Migration = require("../models/migration.js")
let Staff = require("../models/staff.js")
let Exportinfo = require("../models/exportinfo.js")
let Errorinfo = require("../models/errorinfo.js")
let Task = require("../models/task.js")

describe("Repository", () => {
  before(() => {
    return Repository.deleteMany({}).exec()
  })
  describe("#create and save repository", () => {
    before(() => {
      return Repository.deleteMany({}).exec()
    })

    it("should create doc successfully by create method", () => {
      return Repository.create({
        id: 2,
        available_space: 3,
        stored_count: 2,
        locations: [{
          id: 1,
          label: "3",
          place: 2,
          avalibale_height: 2,
          materials: [[], [], []]
        }]
      }).then((result) => {
        expect(result.id).to.equal(2)
      })
    })

    it("should find one docs", () => {
      return Repository.find({}).exec().then((result) => {
        expect(result).to.have.length(1)
      })
    })
  })
  describe("#stored one method", () => {
    let repo
    before(() => {
      let clean = Repository.deleteMany({}).exec()
      let createone = Repository.create({
        id: 2,
        available_space: 3,
        stored_count: 0,
        locations: [{
          id: 1,
          label: "3",
          place: 2,
          avalibale_height: 2,
        }]
      })
      return clean.then(()=>createone).then(r => repo=r)
    })

    it("should increase one to stored_count", () => {
      expect(repo.stored_count).to.equal(0)
      return repo
        .stored_one()
        .then(() => Repository.findOne({_id: repo._id}).exec())
        .then((r) => expect(r.stored_count).to.equal(1))
    })
  })
})

describe("Material", () => {
  describe("#create and save material", () => {
    before(() => {
      let clean = Material.deleteMany({}).exec()
      return Promise.all([clean])
    })

    it("should create doc successfully by create method", () => {
      return Material.create({
        type: 0,
        id: 2,
        description: "test1",
        repository_id: 1,
        location_id: 1,
        layer: 0,
      }).then((result) => {
        expect(result.id).to.equal(2)
        expect(result.status).to.equal(300)
      })
    })

    it("should find one docs", () => {
      return Material.find({}).exec().then((result) => {
        expect(result).to.have.length(1)
      })
    })
  })
})

describe("Exportinfo", () => {
  describe("#create and save exportinfo", () => {
    let mid
    let rid
    before(() => {
      let clean = Exportinfo.deleteMany({}).exec()
      let material = Material.create({
        type: 0,
        id: 98,
        description: "test2",
        repository_id: 1,
        location_id: 1,
        layer: 0,
      }).then(result => mid = result._id)
      let repository = Repository.create({
        id: 98,
        available_space: 3,
        stored_count: 2,
        locations: [{
          id: 1,
          label: "3",
          place: 2,
          avalibale_height: 2,
        }]
      }).then(result => rid = result.id)
      return Promise.all([clean, material, repository])
    })

    it("should create doc successfully by create method", () => {
      return Exportinfo.create({
        actual_export_time: Date.now(),
        material: mid,
        from_repository: rid
      }).then((result) => {
        expect(result.material).to.equal(mid)
        expect(result.from_repository).to.equal(rid)
      })
    })

    it("should find one docs", () => {
      return Exportinfo.find({}).exec().then((result) => {
        expect(result).to.have.length(1)
      })
    })
  })
})

describe("Migration", () => {
  describe("#create and save migration", () => {
    let mid

    before(() => {
      let clean = Migration.deleteMany({}).exec()
      let material = Material.create({
        type: 0,
        id: 99,
        description: "test2",
        repository_id: 1,
        location_id: 1,
        layer: 0
      }).then(result => mid = result._id)
      return Promise.all([clean, material])
    })

    it("should create doc successfully by create method", () => {
      return Migration.create({
        material: mid,
        date: Date.now(),
        from_repository: 2,
        from_location: 3,
        from_layer: 0,
        to_repository: 4,
        to_location: 5,
        to_layer: 1
      }).then((result) => {
        expect(result.material).to.equal(mid)
      })
    })

    it("should find one docs", () => {
      return Migration.find({}).exec().then((result) => {
        expect(result).to.have.length(1)
      })
    })
  })
})

describe("Staff", () => {
  describe("#create and save staff", () => {
    before(() => {
      let clean = Staff.deleteMany({}).exec()
      return Promise.all([clean])
    })

    it("should create doc successfully by create method", () => {
      return Staff.create({
        name: "Tester",
        account: "123456",
        passwd: "123456",
        sex: 1,
        age: 20,
        permission: 1,
      }).then((result) => {
        expect(result.sex).to.equal(1)
        expect(result.name).to.equal("Tester")
        expect(result.account).to.equal("123456")
        expect(result.permission).to.equal(1)
        expect(result.age).to.equal(20)
      })
    })

    it("should find one docs", () => {
      return Staff.find({}).exec().then((result) => {
        expect(result).to.have.length(1)
      })
    })
  })
})

describe("Task", () => {
  describe("#create and save task", () => {
    before(() => {
      let clean = Task.deleteMany({}).exec()
      return Promise.all([clean])
    })

    it("should create doc successfully by create method", () => {
      return Task.create({}).then(() => Task.find({}).exec().then(result => {
        expect(result).to.have.length(1)
      }))
    })
  })
})

describe("Errorinfo", () => {
  describe("#create and save errorinfo", () => {
    before(() => {
      let clean = Errorinfo.deleteMany({}).exec()
      return Promise.all([clean])
    })

    it("should create doc successfully by create method", () => {
      return Errorinfo.create({
        repository: 1,
        location: 3,
        layer: 1,
        image: "/sdfa/df.png"
      }).then((result) => {
        expect(result.repository).to.equal(1)
        expect(result.location).to.equal(3)
      })
    })

    it("should find one docs", () => {
      return Staff.find({}).exec().then((result) => {
        expect(result).to.have.length(1)
      })
    })
  })
})


/* test_models.js ends here */
