/* utils.js --- tools for defining models
 *
 * Maintainer: Mephis Pheies ( MephistoMMM )
 * Email: mephistommm@gmail.com
 *
 * License:
 * MIT License
 */
let mongoose = require("./db.js")
let Schema = mongoose.Schema

exports.Integer = (other = {}) => Object.assign({}, other, {
  type: Number,
  validate: Number.isInteger
})

exports.IntRequired = (other = {}) => exports.Integer(Object.assign({}, other, {
  required: "{PATH} is required!"
}))

exports.IdRequired = (other={}) => Object.assign({}, other, {
  type: Schema.Types.ObjectId,
  required: "{PATH} is required!"
})

/* utils.js ends here */
