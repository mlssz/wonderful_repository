/* material.js --- model of material
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

// Material Model
let materialSchema = Schema({
  id: utils.Integer({
    default: () => Date.now(),
    min: 1,
    unique: true
  }),
  type: {
    type: String,
    required: "{PATH} is required!",
    trim: true,
    minlength: 1
  },
  description: {
    type: String,
    default: ""
  },
  import_time: {
    type: Date,
    default: () => Date.now()
  },
  estimated_export_time: Date,
  height: {
    type: Number,
    default: 1,
    min: 0
  },
  length: {
    type: Number,
    default: 2,
    min: 0
  },
  width: {
    type: Number,
    default: 1,
    min: 0
  },
  repository_id: utils.IdRequired(),
  location_id: utils.IntRequired(),
  layer: utils.IntRequired({min: 0}),
  status: utils.Integer({
    default: 300
  }),
  last_migration: Schema.Types.ObjectId,
  location_update_time: {
    type: Date,
    default: () => Date.now()
  }
})

module.exports = mongoose.model("Material", materialSchema)

/* material.js ends here */
