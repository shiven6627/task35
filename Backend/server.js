const express = require('express')
const dotenv = require('dotenv')
const workoutRoutes = require('./routes/workout')
const mongoose = require('mongoose')
const cors = require('cors')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use((req,res,next)=>{
     console.log(req.path,req.method);
     next()     
})

app.get("/", (req,res)=>{
    res.json({
        msg: "hey how are you"
    })
})

app.use('/api/workouts/', workoutRoutes)

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})
})
.catch((error)=>{ console.log(error);
})

const PORT = process.env.PORT;



