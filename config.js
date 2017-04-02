/* config.js --- Configurations about application
 *
 * Maintainer: Mephis Pheies ( MephistoMMM )
 * Email: mephistommm@gmail.com
 *
 * License:
 * MIT License
 */

module.exports = {
  // key: environment, value: Configuration
  "develop": {
    "mongo": {
      "host": "o1.mephis.me",
      "user": "mlssz",
      "passwd": "passwd123",
      "db":   "mlssztestdb"
    }
  },
  "product": {
    "mongo": {
      "host": "o1.mephis.me",
      "port": 27017,
      "user": "mlssz",
      "passwd": "passwd123",
      "db":   "mlsszdb"
    }

  },
  "test": {

  }
}

/* config.js ends here */
