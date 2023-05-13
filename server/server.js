const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const blogRoute = require("./routes/blog")
const authRoute = require("./routes/auth")

require("dotenv").config()

const app = express()

//connect cloud database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    UseUnifiedTopology:false
}).then(()=>console.log("Connect DataBase Succeed"))
.catch((err)=>console.console.log(err))

//middleware 
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//route
app.use('/api',blogRoute)
app.use('/api',authRoute)

const port = process.env.PORT || 8080
app.listen(port,()=>console.log(`Start server in port ${port}`))