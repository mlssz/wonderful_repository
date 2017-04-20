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
    default: 2640,
    min: 0
  },
  stored_count: utils.Integer({
    default: 0,
    min: 0
  }),
  locations: [{
    id: utils.IntRequired({
      min: 1
    }),
    label: {
      type: String,
      required: "{PATH} is required!"
    },
    available_space: utils.IntRequired({
      min: 1
    }),
    avalibale_space: {
      type: Number,
      default: 60,
      min: 0
    },
    materials_num: {
      type:[Number],
      default: [0, 0, 0]
    }
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
