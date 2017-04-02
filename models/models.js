/* models --- defines models using mongoose
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
let Schema = mongoose.Schema

// Repository Model
let repoSchema = Schema({
  id: {
    type: Number,
    required: "{PATH} is required!",
    unique: true,
    min: 1,
    validate: Number.isInteger
  },
  available_space: {type: Number, default: 0, min: 0},
  stored_count: {type: Number, default: 0, min: 0, validate: Number.isInteger},
  locations: [
    {
      id: {
        type: Number,
        required: "{PATH} is required!",
        min: 1,
        validate: Number.isInteger
      },
      label: {type: String, required: "{PATH} is required!"},
      place: {
        type: Number,
        required: "{PATH} is required!",
        validate: Number.isInteger,
        min: 1
      },
      avalibale_height: {type: Number, default: 2, min: 0},
      is_top_full: {type: Boolean, default: false},
      materials: [Schema.Types.ObjectId]
    }
  ]
})
repoSchema.methods.stored_one = function() {
  return this.update({"$inc": {"stored_count": 1}}).exec()
}

exports.Repository = mongoose.model("Repository", repoSchema)

/* models ends here */
