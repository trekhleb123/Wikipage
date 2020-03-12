const express = require("express")
const router = express.Router()
const { Page } = require("../models")
const { addPage } = require("../views")

// retrieve all wiki pages
router.get("/", async (req, res, next) => {
  try {
    // add await later
    res.send("got to GET /wiki/")
  } catch (error) {
    next(error)
  }
})

// submit new pg to db
router.post("/", async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  })

  try {
    await page.save()
    res.redirect("/")
  } catch (error) {
    next(error)
  }

  //res.send("got to POST /wiki/")
})

// retrieve 'add a page' form
router.get("/add", (req, res) => {
  res.send(addPage())
})

module.exports = router
