/* check_help --- help check materials
 *
 * Maintainer: Mephis Pheies ( MephistoMMM )
 * Email: mephistommm@gmail.com
 *
 * License:
 * MIT License
 */

Set.prototype.isSuperset = function(subset) {
  for (let elem of subset) {
    if (!this.has(elem)) {
      return false
    }
  }
  return true
}

Set.prototype.union = function(setB) {
  let union = this
  for (let elem of setB) {
    union.add(elem)
  }
  return union
}

Set.prototype.intersection = function(setB) {
  let intersection = this
  for (let elem of intersection) {
    if (!setB.has(elem)) {
      intersection.delete(elem)
    }
  }
  return intersection
}

Set.prototype.difference = function(setB) {
  let difference = this
  for (let elem of setB) {
    difference.delete(elem)
  }
  return difference
}

const Union = (A, B) => {
  let C = new Set()
  C.union(A)
  C.union(B)
  return C
}

const Intersection = (A, B) => {
  let C = new Set()
  C.union(A)
  C.intersection(B)
  return C
}

const Difference = (A, B) => {
  let C = new Set()
  C.union(A)
  C.difference(B)
  return C
}

const diffBetweenTwoSets = (A, B) => {
  return [Difference(A, B), Difference(B, A)]
}

module.exports = {
  diffBetweenTwoSets,
  Union,
  Intersection,
  Difference
}

//Examples
// let setA = new Set([1, 2, 3, 4]),
//     setB = new Set([2, 3]),
//     setC = new Set([3, 4, 5, 6])

// setA.isSuperset(setB) // => true
// setA.union(setC) // => Set [1, 2, 3, 4, 5, 6]
// setA.intersection(setC) // => Set [3, 4]
// setA.difference(setC) // => Set [1, 2]


/* check_help ends here */
