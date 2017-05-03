/* errorinfo.js --- model of error information
 *
 * Maintainer: Mephis Pheies ( MephistoMMM )
 * Email: mephistommm@gmail.com
 *
 * License:
 * MIT License
 * This file was written according to https://mlssz.github.io/DocsV2/dev_docs/db_design/index.html
*/
let mongoose = require("./db.js")
let utils = require("./utils.js")

let Schema = mongoose.Schema

// Errorinfo Model
let errorinfoSchema = Schema({
  fixed: {
    type: Boolean,
    default: false,
  },
  error_code: utils.Integer({
    default: 1,
    min:1,
    max:2
  }),
  repository: utils.IntRequired({}),
  location: utils.IntRequired({
    min: 0
  }),
  layer: utils.IntRequired({
    min: 0
  }),
  material: utils.IdRequired(),
  image: {
    type: String,
    required: "{PATH} is required!"
  }
})

module.exports = mongoose.model("Errorinfo", errorinfoSchema)


/* errorinfo.js ends here */
