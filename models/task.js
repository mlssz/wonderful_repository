/* task.js --- model of task
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

// Task Model
let taskSchema = Schema({
  action: utils.Integer({
    default: 500
  }),
  staff: Schema.Types.ObjectId,
  status: utils.Integer({
    default: 0,
    min: 0
  }),
  migration: Schema.Types.ObjectId,
  error: Schema.Types.ObjectId,
  publish_time: {
    type: Date,
    default: () => Date.now()
  },
  start_time: Date,
  end_time: Date,
  remark: String
})

module.exports = mongoose.model("Task", taskSchema)


/* task.js ends here */
