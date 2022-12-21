// const express = require('express');
import express from 'express'
import { getAllBreeds, getOneBreedInfo } from '../controllers/breedsController.js';

const router = express.Router();

router.get('/', getAllBreeds);
router.get('/:id', getOneBreedInfo);

// router.post('/', createWorkout);
// router.delete('/:id', deleteWorkout);
// router.patch('/:id', updateWorkout);

export default router