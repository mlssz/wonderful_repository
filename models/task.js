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

let Migration = require("./migration.js")
let Material = require("./material.js")
let Errorinfo = require("./errorinfo.js")
let Staff = require("./staff.js")

let ObjectId = mongoose.Types.ObjectId
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

taskSchema.methods.combine_migration_or_error = function(with_staff=false) {
  let task = this
  let action = task.action

  let combine_func
  if(500 <= action && action <600){
    // combine migration if action starts with 5
    combine_func = task._combine_migration(task)
  }
  if(600 <= action && action <700){
    // combine migration if action starts with 6
    combine_func = task._combine_error(task)
  }

  if(!with_staff || task.staff === undefined || task.staff === null || !task.staff) {
    return combine_func
  }

  return combine_func
    .then(v => Staff.findOne({_id: task.staff}).exec().then(s => {
      v.staff = s.toJSON()
      return v
    }))
}
taskSchema.methods._combine_migration = task => {
  // find migration
  return Migration
    .findOne({_id: ObjectId(task.migration)}).exec()
    .then(migration => {
      if (migration === null) throw "Invalid Task: Not Found Migration."

      // find material
      return Promise.all([
        migration,
        Material.findOne({_id: migration.material}).exec()
      ])
    })
    .then(data => {
      if (data[1] === null) throw "Invalid Task: Not Found Material."

      let result = task.toJSON()

      delete data[0]["material"]

      result["material"] = data[1]
      result["migration"] = data[0]
      return result
    })
}
taskSchema.methods._combine_error = task => {
  // find errorinfo
  return Errorinfo
    .findOne({_id: ObjectId(task.error)}).exec()
    .then(errorinfo => {
      if (errorinfo === null) throw `Invalid Task: Not Found Errorinfo(${task.error}).`

      // find material
      return Promise.all([
        errorinfo,
        Material.findOne({_id: errorinfo.material}).exec()
      ])
    }).then( data => {
      if (data[1] === null) throw "Invalid Task: Not Found Material."

      let result = task.toJSON()

      delete data[0]["material"]

      result["material"] = data[1]
      result["error"] = data[0]
      return result
    })
}



module.exports = mongoose.model("Task", taskSchema)


/* task.js ends here */
