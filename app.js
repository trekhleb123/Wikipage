const express = require("express")
const app = express()
const morgan = require("morgan")
const path = require("path")
const { db, Page, User } = require("./models")

app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res, next) => {
  res.send("hello world")
})

db.authenticate().then(() => {
  console.log("connected to the database")
})

async function page() {
  try {
    await db.sync({ force: true })
    app.listen(3000, () => {
      console.log(`listening on port: 3000`)
    })
  } catch (err) {
    console.log(err)
    await db.close()
  }
}
page()
