/* test_query.js --- test query data according to url query
 *
 * Maintainer: Mephis Pheies ( MephistoMMM )
 * Email: mephistommm@gmail.com
 *
 * License:
 * MIT License
 */
const expect = require("chai").expect
const Material = require("../models/material.js")
const findByQuery = require("../libs/find_helpers.js").findByQuery
const slicePage = require("../libs/find_helpers.js").slicePage

describe("Query", () => {
  before(() => {
    let materials = Material.deleteMany({}).exec().then(() => Material.create({
      type: 0,
      id: 2,
      description: "test1",
      repository_id: 1,
      location_id: 3,
      layer: 0,
      status: 301,
    }, {
      type: 0,
      id: 4,
      description: "test1",
      repository_id: 2,
      location_id: 3,
      layer: 0,
      status: 301,
    },{
      type: 0,
      id: 3,
      description: "helper_test",
      repository_id: 1,
      location_id: 5,
      layer: 0,
      status: 301,
    }, {
      type: 0,
      id: 5,
      description: "helper_test",
      repository_id: 1,
      location_id: 4,
      layer: 0,
      status: 200,
    }))

    return Promise.all([materials])
  })

  describe("#find data according to query", () => {
    it("should find one material", () => {
      let query = [
        {key: "repository_id", value: 1},
        {key: "location_id", value: [3, 4]},
        {key: "status", region: [300, 1000]},
        {key: "status", region: [0, 400]},
      ]

      return findByQuery(Material, query)
        .exec()
        .then( results => {
          expect(results).to.have.length(1)
          expect(results[0].repository_id).to.equal(1)
          expect(results[0].location_id).to.oneOf([3, 4])
          expect(results[0].status).to.within(300, 400)
        })
    })

  })


  describe("#find then slice page", () => {
    it("should find two material", () => {
      return slicePage(Material.find({}).sort({id: 1}), 1, 2)
        .exec()
        .then( results => {
          expect(results).to.have.length(2)
          expect(results[0].id).to.equal(4)
          expect(results[1].id).to.equal(5)
        })
    })
  })
})

/* test_query.js ends here */
