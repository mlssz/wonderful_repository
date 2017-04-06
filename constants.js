/* constants.js --- define constants value according to config.js
 *
 * Maintainer: Mephis Pheies ( MephistoMMM )
 * Email: mephistommm@gmail.com
 *
 * License:
 * MIT License
 */
let configs = require("./config.js")
let env = process.env

// flowing defines all default value

// For mongodb
const DEFAULT_MONGO_HOST   = "localhost"
const DEFAULT_MONGO_PORT   = 27017
const DEFAULT_MONGO_USER   = ""
const DEFAULT_MONGO_PASSWD = ""
const DEFAULT_MONGO_DB     = "test"

// flowing is environment constants

// DEV_ENV is represented as development environment
const DEV_ENV  = 0
// PRO_ENV is represented as production environment
const PRO_ENV  = 1
// TEST_ENV is represented as testing environment
const TEST_ENV = 2

exports.DEV_ENV = DEV_ENV
exports.PRO_ENV = PRO_ENV
exports.TEST_ENV = TEST_ENV

// ENV is the one of aboving value, representing program running environment
const ENV = env.NODE_ENV === undefined ? DEV_ENV :
  env.NODE_ENV === "develop" ? DEV_ENV :
  env.NODE_ENV === "test" ? TEST_ENV :
  env.NODE_ENV === "product" ? PRO_ENV : DEV_ENV

exports.ENV = ENV

// flowing specify the configuration

let config = configs["develop"]
if (ENV === PRO_ENV) {
  config = configs["product"]
}
if (ENV === TEST_ENV) {
  config = configs["test"]
}

// flowing is mongodb configuration

// MONGO_HOST is the host of mongodb
exports.MONGO_HOST = config.mongo && config.mongo.host || DEFAULT_MONGO_HOST

// MONGO_PORT is the port of mongodb
exports.MONGO_PORT = config.mongo && config.mongo.port || DEFAULT_MONGO_PORT

// MONGO_USER is the user of mongodb
exports.MONGO_USER = config.mongo && config.mongo.user || DEFAULT_MONGO_USER

// MONGO_PASSWD is the passwd of mongodb
exports.MONGO_PASSWD = config.mongo && config.mongo.passwd || DEFAULT_MONGO_PASSWD

// MONGO_DB is the db of mongodb
exports.MONGO_DB = config.mongo && config.mongo.db || DEFAULT_MONGO_DB

// flowing is configuration of business

// REPO_WIDTH is the width of each repository (meter)
exports.REPO_WIDTH  = 30
// REPO_LENGTH is the length of each repository (meter)
exports.REPO_LENGTH = 80

// LOCATION_WIDTH is the width of each location (meter)
exports.LOCATION_WIDTH  = 3
// LOCATION_LENGTH is the length of each location (meter)
exports.LOCATION_LENGTH = 10
// LOCATION_NUM is the number of locations in repository
exports.LOCATION_NUM    = 44

// LOCATION_COLUMN is the number of column which material put as
exports.LOCATION_COLUMN = 2
// LOCATION_LENGTH is the height of materials stacked up at each location (meter)
exports.LOCATION_HEIGHT = 3

/* constants.js ends here */
