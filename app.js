const express = require("express")
const app = express()
const morgan = require("morgan")
const path = require("path")
const { db, Page, User } = require("./models")

const wikiRouter = require("./routes/wiki")
const userRouter = require("./routes/user")

app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: false }))

// app.use('/wiki', require('./routes/wiki'));
// app.use('/user', require('./routes/user'));
app.use("/wiki", wikiRouter)

app.get("/", (req, res) => {
  res.redirect("/wiki")
})

db.authenticate().then(() => {
  console.log("connected to the database")
})

async function page() {
  try {
    Page.beforeValidate((req.body) => {
      // function generateSlug (title) {
      // 	// Removes all non-alphanumeric characters from title
      // 	// And make whitespace underscore
      // 	return title.replace(/\s+/g, '_').replace(/\W/g, '');
      // }
    })
    await db.sync({ force: true })
    app.listen(3000, () => {
      console.log(`listening on port: 3000`)
    })
    await db.close()
  } catch (err) {
    console.log(err)
    await db.close()
  }
}

page()
