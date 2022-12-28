import express from 'express';
import dotenv from 'dotenv'
import workoutRoutes from './routes/workouts.js'
import userRoutes from './routes/user.js'
import mongoose from 'mongoose';
import cors from 'cors'
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)


mongoose.set('strictQuery', true)
// connect to db
mongoose.connect(process.env.MONG_URI)
    .then(()=>{
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & listening on port 4000!')
        })        
    })
    .catch((err) => console.log(err)) 

