import express  from "express";
import {
    createWorkout,
    gettWorkouts,
    gettWorkout,
    deleteWorkout,
    updateWorkout
} from '../controllers/workoutControllers.js'
const router = express.Router()

// get all workouts
router.get('/', gettWorkouts)
// get single workout
router.get('/:id', gettWorkout)
//post new workout
router.post('/', createWorkout)

//delete new workout
router.delete('/:id', deleteWorkout)
 
//update new workout
router.patch('/:id', updateWorkout)
export default router 