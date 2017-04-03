/* migration.js --- model of migration
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

// Migration Model
let migrationSchema = Schema({
  material: utils.IdRequired(),
  from_repository: utils.IntRequired(),
  from_location: utils.IntRequired(),
  to_repository: utils.IntRequired(),
  to_location: utils.IntRequired()
})

module.exports = mongoose.model("Migration", migrationSchema)

/* migration.js ends here */
