
const express = require('express')
const app = express()
const cors = require('cors')
const studentRouter = require('./apis/student.js')
const userRouter = require('./apis/user.js')

require('./db/mongoose')

const port = 3000
app.use(cors())
app.use(express.json())

app.use(studentRouter)
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
