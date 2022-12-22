import express from 'express';
import dotenv from 'dotenv'
import workoutRoutes from './routes/workouts.js'
import mongoose from 'mongoose';
dotenv.config()

const app = express()

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use('/api/workouts',workoutRoutes)

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

