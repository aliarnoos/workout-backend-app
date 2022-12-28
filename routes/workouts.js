import express  from "express";
import {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} from '../controllers/workoutControllers.js'
import { requireAuth } from "../middleware/requireAuth.js";
const router = express.Router()

// require auth for all workouts routes
router.use(requireAuth)

// get all workouts
router.get('/', getWorkouts)
// get single workout
router.get('/:id', getWorkout)
//post new workout
router.post('/', createWorkout)

//delete new workout
router.delete('/:id', deleteWorkout)
 
//update new workout
router.patch('/:id', updateWorkout)
export default router 