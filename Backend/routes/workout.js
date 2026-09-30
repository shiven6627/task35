const express = require('express')
const Workout = require('../Models/workoutmodel')
const { createWorkout, getWorkouts, getworkoutbyId , deleteWorkout, updateWorkout} = require('../controllers/workoutController')

const router = express.Router()

router.get('/', getWorkouts)

router.get('/:id',getworkoutbyId)

router.post('/', createWorkout)

router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)

module.exports = router