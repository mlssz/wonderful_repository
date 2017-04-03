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

let Integer = (other = {}) => Object.assign({}, other, {
  type: Number,
  validate: Number.isInteger
})

let IntRequired = (other = {}) => Integer(Object.assign({}, other, {
  required: "{PATH} is required!"
}))

// Repository Model
let repoSchema = Schema({
  id: IntRequired({
    unique: true,
    min: 1
  }),
  available_space: {
    type: Number,
    default: 0,
    min: 0
  },
  stored_count: Integer({
    default: 0,
    min: 0
  }),
  locations: [{
    id: IntRequired({
      min: 1
    }),
    label: {
      type: String,
      required: "{PATH} is required!"
    },
    place: IntRequired({
      min: 1
    }),
    avalibale_height: {
      type: Number,
      default: 2,
      min: 0
    },
    is_top_full: {
      type: Boolean,
      default: false
    },
    materials: [Schema.Types.ObjectId]
  }]
})
repoSchema.methods.stored_one = function() {
  return this.update({
    "$inc": {
      "stored_count": 1
    }
  }).exec()
}

exports.Repository = mongoose.model("Repository", repoSchema)

// Material Model
let materialSchema = Schema({
  id: IntRequired({
    default: () => Date.now(),
    min: 1,
    unique: true
  }),
  type: Integer({
    default: 0,
    min: 1
  }),
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
    default: 0,
    min: 0
  },
  length: {
    type: Number,
    default: 0,
    min: 0
  },
  width: {
    type: Number,
    default: 0,
    min: 0
  },
  repository_id: IntRequired(),
  location_id: IntRequired(),
  status: Integer({
    default: 300
  }),
  migrations: [Schema.Types.ObjectId],
  location_update_time: {
    type: Date,
    default: () => Date.now()
  }
})

exports.Material = mongoose.model("Material", materialSchema)

// Migration Model
let migrationSchema = Schema({
  material: {
    type: Schema.Types.ObjectId,
    required: "{PATH} is required!"
  },
  from_repository: IntRequired(),
  from_location: IntRequired(),
  to_repository: IntRequired(),
  to_location: IntRequired()
})

exports.Migration = mongoose.model("Migration", migrationSchema)

// Task Model
let taskSchema = Schema({
  action: Integer({
    default: 500
  }),
  staff: {
    type: Schema.Types.ObjectId,
    required: "{PATH} is required!"
  },
  status: Integer({
    default: 0,
    min: 0
  }),
  migration: Schema.Types.OjbectId,
  err_repository: Integer(),
  err_location: Integer(),
  publish_time: {
    type: Date,
    default: () => Date.now()
  },
  start_time: Date,
  end_time: Date,
  remark: String
})

exports.Task = mongoose.model("Task", taskSchema)

// Exportinfo Model
let exportinfoSchema = Schema({
  actual_export_time: Date,
  material: {
    type: Schema.Types.ObjectId,
    required: "{PATH} is required!"
  },
  destination: {
    type: String,
    default: ""
  },
  from_repository: {
    type: Schema.Types.ObjectId,
    required: "{PATH} is required!"
  }
})

exports.Exportinfo = mongoose.model("Exportinfo", exportinfoSchema)

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
  sex: Integer({
    default: 1,
    min: 0,
    max: 1
  }),
  age: Integer({
    default: 1,
    min: 1
  }),
  position: Integer({
    default: 1,
    min: 0
  }),
  signup_time: {
    type: Date,
    default: () => Date.now()
  },
  last_login_time: Date
})

exports.Staff = mongoose.model("Staff", staffSchema)

/* models ends here */
