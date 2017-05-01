var promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
        console.log(1)
        resolve()
    }, 3000)
})

promise.then(() => {
    setTimeout(() => {
        console.log(2)
    }, 1500)
}).then(() => {
    setTimeout(() => {
        console.log(3)
    }, 500)
})