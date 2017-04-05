/* repository.js --- model of repository
 *
 * Maintainer: Mephis Pheies ( MephistoMMM )
 * Email: mephistommm@gmail.com
 *
 * License:
 * MIT License
 *
 * Description:
 * This file was written according to https://mlssz.github.io/DocsV2/dev_docs/db_design/index.html
 */
let mongoose = require("./db.js")
let utils = require("./utils.js")

let Schema = mongoose.Schema

// Repository Model
let repoSchema = Schema({
  id: utils.IntRequired({
    unique: true,
    min: 1
  }),
  available_space: {
    type: Number,
    default: 3960,
    min: 0
  },
  stored_count: utils.Integer({
    default: 0,
    min: 0
  }),
  volume_location: [{
    volume: {
      type: Number,
      required: "{PATH} is required!",
      min: 0
    },
    location: utils.IntRequired({
      min: 1
    }),
    count: utils.Integer({
      min: 0,
      default: 1
    })
  }],
  locations: [{
    id: utils.IntRequired({
      min: 1
    }),
    label: {
      type: String,
      required: "{PATH} is required!"
    },
    place: utils.IntRequired({
      min: 1
    }),
    avalibale_space: {
      type: Number,
      default: 90,
      min: 0
    },
    materials: [Schema.Types.ObjectId]
  }]
})

repoSchema.methods.stored_one = function() {
  return this.update({
    "$inc": {
      "stored_count": 1
    }
  }).exec()
}

module.exports = mongoose.model("Repository", repoSchema)

/* repository.js ends here */
