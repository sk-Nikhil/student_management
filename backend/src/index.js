const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv')
const router = require('./router.js')
require('./db/mongoose')

dotenv.config()
app.use(cors());
app.use(express.json());
app.use(router)

app.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}`)
});
