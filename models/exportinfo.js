/* exportinfo.js --- model of exportinfo
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

// Exportinfo Model
let exportinfoSchema = Schema({
  actual_export_time: Date,
  material: utils.IdRequired(),
  destination: {
    type: String,
    default: ""
  },
  from_repository: utils.IntRequired({
    unique: true,
    min: 1
  })
})

module.exports = mongoose.model("Exportinfo", exportinfoSchema)

/* models ends here */
