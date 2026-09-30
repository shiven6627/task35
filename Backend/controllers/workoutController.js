const Workout = require('../models/workoutmodel')
const mongoose = require('mongoose')

exports.getWorkouts = async (req, res) => {
    try {
        const workout = await Workout.find().sort({ createdAt: -1 });

        res.status(200).json(workout);

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

exports.getworkoutbyId = async (req, res) => {
    const { id } = req.params;
    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(400).json({ error: 'Workout not found' });
    }

    res.status(200).json(workout);
};

exports.createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }

    if (!load) {
        emptyFields.push('load')
    }

    if (!reps) {
        emptyFields.push('reps')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({
            error: 'Please fill in all the fields',
            emptyFields
        })
    }

    try {
        const workout = await Workout.create({
            title,
            loads: load,
            reps
        })

        res.status(201).json(workout)

    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

exports.deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Workout not found' });
    }
    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
        return res.status(400).json({ error: 'Workout not found' });
    }

    res.status(200).json(workout);
};

exports.updateWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Workout not found' });
    }   

    const workout = await Workout.findOneAndUpdate(
        {
            _id: id
        }, 
        {
        ...req.body
         },
          { 
            new: true 
        });
        
    if (!workout) {
        return res.status(400).json({ error: 'Workout not found' });
    }   

    res.status(200).json(workout);
};
