const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
const dbpath = path.join(__dirname, 'covid19IndiaPortal.db')
let db = null
const IntializeAndRunServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('server started  http://localhost:3000')
    })
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}
IntializeAndRunServer()
// API 1
app.post('/login/', async (request, response) => {
  const userDetails = request.body
  const {username, password} = request.body
  const userCheck = ` select * from user where username='${username}`
  const query1 = await db.get(userCheck)
  if (query1 === undefined) {
    response.status(400)
    response.send('Invalid user')
  }
})
