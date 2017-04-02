/* db.js --- connect mongodb
 *
 * Maintainer: Mephis Pheies ( MephistoMMM )
 * Email: mephistommm@gmail.com
 *
 * License:
 * MIT License
 */
let mongoose = require("mongoose")
let constants = require("../constants.js")

let host_and_port_and_db = `${constants.MONGO_HOST}:${constants.MONGO_PORT}/${constants.MONGO_DB}`
let url
if (constants.MONGO_USER !== "") {
  url = `mongodb://${constants.MONGO_USER}:${constants.MONGO_PASSWD}@${host_and_port_and_db}`
}else {
  url = `mongodb://${host_and_port_and_db}`
}

mongoose.connect(url, (error) => {
  if (error) {
    console.error(error)
    process.exit(1)
  }
  console.log(`Connect to mongodb(${host_and_port_and_db}) successfully!`)
})

// config to native promise. http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise

module.exports = mongoose

/* db.js ends here */
