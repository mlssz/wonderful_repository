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
exports.MONGO_HOST = config.mongo === undefined ? DEFAULT_MONGO_HOST :
  config.mongo.host === undefined ? DEFAULT_MONGO_HOST : config.mongo.host

// MONGO_PORT is the port of mongodb
exports.MONGO_PORT = config.mongo === undefined ? DEFAULT_MONGO_PORT :
  config.mongo.port === undefined ? DEFAULT_MONGO_PORT : config.mongo.port

// MONGO_USER is the user of mongodb
exports.MONGO_USER = config.mongo === undefined ? DEFAULT_MONGO_USER :
  config.mongo.user === undefined ? DEFAULT_MONGO_USER : config.mongo.user

// MONGO_PASSWD is the passwd of mongodb
exports.MONGO_PASSWD = config.mongo === undefined ? DEFAULT_MONGO_PASSWD :
  config.mongo.passwd === undefined ? DEFAULT_MONGO_PASSWD : config.mongo.passwd

// MONGO_DB is the db of mongodb
exports.MONGO_DB = config.mongo === undefined ? DEFAULT_MONGO_DB :
  config.mongo.db === undefined ? DEFAULT_MONGO_DB : config.mongo.db

// flowing is configuration of business

// REPO_WIDTH is the width of each repository (meter)
exports.REPO_WIDTH  = 30
// REPO_HEIGHT is the height of each repository (meter)
exports.REPO_HEIGHT = 2
// REPO_LENGTH is the length of each repository (meter)
exports.REPO_LENGTH = 80

// LOCATION_WIDTH is the width of each location (meter)
exports.LOCATION_WIDTH  = 3
// LOCATION_LENGTH is the length of each location (meter)
exports.LOCATION_LENGTH = 10
// LOCATION_HEIGHT is the height of each location (meter)
exports.LOCATION_HEIGHT = exports.REPO_HEIGHT
// LOCATION_NUM is the number of locations in repository
exports.LOCATION_NUM    = 44

/* constants.js ends here */
