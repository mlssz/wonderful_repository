/* staff.js --- model of staff
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

// Staff Model
let staffSchema = Schema({
  name: {
    type: String,
    default: "无名"
  },
  account: {
    type: String,
    required: "{PATH} is required!",
    validate: (v) => v.length >= 6
  },
  passwd: {
    type: String,
    required: "{PATH} is required!",
    validate: (v) => v.length >= 6
  },
  sex: utils.Integer({
    default: 1,
    min: 0,
    max: 1
  }),
  age: utils.Integer({
    default: 1,
    min: 1
  }),
  permission: utils.Integer({
    default: 1,
    min: 0
  }),
  signup_time: {
    type: Date,
    default: () => Date.now()
  },
  last_login_time: Date
})

module.exports = mongoose.model("Staff", staffSchema)

/* staff.jsq ends here */
