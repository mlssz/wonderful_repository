// let i = {}
// let j = { a: 1, b: 2 }
// for (let x in j) {
//     i[x] = j[x]
// }
// console.log(i)

// let n = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
// let m = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
// let ls = []
// for (let i = 1; i <= 44; i++) {
//     ls.push({ id: i, place: m[i - 1], label: n[i - 1], available_space: 60, materials_num: [0, 0, 0] })
// }
// let repo = {
//     id: 1,
//     available_space: 2640,
//     locations: ls,
//     stored_count: 0
// }
// console.log(JSON.stringify(repo))

// var a = { a: "" }
// var c = a.b
// if (a.b != null) {
//     console.log(a.b)
// }
let repository = require("../models/repository")

repository.findOne({id:1},(err, doc)=>{
    if (err){
        console.log(err)
    } else {
        doc.id = 2
        console.log(doc.id)
        doc.ok=56
        console.log(doc)
        doc = doc.toObject()
        doc.ok=56
        console.log(doc)
    }
})