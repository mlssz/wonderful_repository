/* find_helpers.js.js --- helper funtions to find data in mongodb
 *
 * Maintainer: Mephis Pheies ( MephistoMMM )
 * Email: mephistommm@gmail.com
 *
 * License:
 * MIT License
 */


/**
 * findByQuery find special data from db according url query(other)
 *
 * @param {Mongoose.Model} model models defined in directory ./models/
 * @param {Object} query     value of url.query["other"]
 * @returns {Mongoose.Query} find documents from mongodb according to query
 */
const findByQuery = (model, query) => {
  // First off, tanslate every items in query to condition element
  let conditions = {"$and":[]}
  let and = conditions["$and"]
  for(let i of query) {
    if(i.key === undefined || typeof i.key !== "string") {
      return Promise.reject("Invalid Query Item: key should be a string.")
    }

    if(i.value) {
      let elem = i.value instanceof Array ? {"$in": i.value} : i.value
      and.push({[i.key]: elem})
    }
    if(i.region && i.region.length >= 2) {
      and.push({[i.key]: {"$gte": i.region[0], "$lt": i.region[1]}})
    }
  }

  // Finally find data according to conditions
  return model.find(conditions)
}

/**
 * slicePage slice datas as a page
 *
 * @param {Mongoose.Model} Query
 * @param {Number} page   value of url.query["page"]
 * @param {Number} limit  value of url.query["limit"]
 * @returns {Mongoose.Model} the same as parameter query
 */
const slicePage = (Query, page, limit) => {
  if(page < 0 || limit <= 0) {
    return Query
  }

  return Query.skip(page*limit).limit(limit)
}

module.exports = {
  findByQuery,
  slicePage
}

/* find_helpers.js.js ends here */