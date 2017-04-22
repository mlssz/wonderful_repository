let express = require("express")
let path = require("path")
let favicon = require("serve-favicon")
let fs = require("fs")
let logger = require("morgan")
let cookieParser = require("cookie-parser")
let bodyParser = require("body-parser")
let session = require('express-session')

let app = express()

app.use(session({ secret: 'wonderful', cookie: { maxAge: 60000 }}))

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")))
app.use(logger("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// import and use routes
let routes_path = path.join(__dirname, "./routes")
let routes = fs.readdirSync(routes_path)
routes = routes
  .filter((r) => r.split(".").pop() === "js")
  .map((r) => {
    try{
      let item = require(path.join(routes_path, r))
      return [item.path.split("/").length, item]
    }catch(err){
      console.error(err)
      return null
    }
  })
  .filter(r => r !== null).sort()
  .map((r) => r[1])
routes.forEach((r) => {
  app.use(r.path, r.router)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error("Not Found")
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
