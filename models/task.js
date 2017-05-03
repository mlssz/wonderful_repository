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

taskSchema.methods.combine_material_or_error = function() {
  let task = this
  let action = task.action

  if(500 <= action && action <600){
    // combine migration if action starts with 5
    return task._combine_material(task)
  }
  if(600 <= action && action <700){
    // combine migration if action starts with 6
    return task._combine_error(task)
  }
}

taskSchema.methods._combine_material = task => {
  let migration_select = {date: 0}
  let material_select = {repository_id: 0, location_id: 0, layer: 0}

  // find migration
  return Migration
    .findOne({_id: ObjectId(task.migration)}, migration_select).exec()
    .then(migration => {
      if (migration === null) throw "Invalid Task: Not Found Migration."

      // find material
      return Promise.all([
        migration,
        Material.findOne({_id: migration.material}, material_select).exec()
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
  let error_select = {}
  let material_select = {}

  // find migration
  return Errorinfo
    .findOne({_id: ObjectId(task.error)}, error_select).exec()
    .then(errorinfo => {
      if (errorinfo === null) throw `Invalid Task: Not Found Errorinfo(${task.error}).`

      // find material
      return Material
        .findOne({_id: errorinfo.material}, material_select).exec()
        .then(material => {
          if (material === null) throw `Invalid Task: Not Found Material(${errorinfo.migration}).`

          return Object.assign(material.toJSON(), errorinfo.toJSON())
        })
    })
    .then( data => {
      let result = task.toJSON()

      delete data["material"]
      delete result["migration"]

      result["material"] = data
      return result
    })
}



module.exports = mongoose.model("Task", taskSchema)


/* task.js ends here */
