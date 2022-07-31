const express = require('express')
const router = express.Router()
const {defaultHandler} = require('../controller/defaultController')

router.get('/',defaultHandler)


module.exports = router