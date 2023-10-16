const express = require('express')
const router = express.Router()

const userRouter = require('./routers/user.js')
const studentRouter = require('./routers/student.js')

router.use(userRouter)
router.use(studentRouter)

module.exports = router