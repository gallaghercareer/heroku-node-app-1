const express = require('express')
const dotenv = require('dotenv').config()
const goalRoute = require('./backend/routes/goalRoutes')
const userRoute = require('./backend/routes/userRoutes')
const defaultRoute = require('./backend/routes/defaultRoutes')
const {errorHandler} = require('./backend/middleware/errorMiddleware')
const port = process.env.PORT || 5001
const app = express()
const connectDB = require('./backend/config/db')
const cors = require('cors')


connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())


//routes
app.use('/', defaultRoute)
app.use('/api/goals',goalRoute)
app.use('/api/users', userRoute)

//error handler
app.use(errorHandler)

app.listen(port,()=>{console.log(`Listening on port: ${port}`)})