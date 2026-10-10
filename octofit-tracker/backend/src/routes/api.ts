import { Router } from 'express';
import {
  ActivityModel,
  LeaderboardEntryModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models/index.js';

const router = Router();

router.get('/users/', async (_request, response) => {
  response.json(await UserModel.find().sort({ name: 1 }).lean());
});

router.post('/users/', async (request, response) => {
  response.status(201).json(await UserModel.create(request.body));
});

router.get('/teams/', async (_request, response) => {
  response.json(await TeamModel.find().sort({ name: 1 }).populate('members').lean());
});

router.post('/teams/', async (request, response) => {
  response.status(201).json(await TeamModel.create(request.body));
});

router.get('/activities/', async (_request, response) => {
  response.json(
    await ActivityModel.find().sort({ date: -1 }).populate('user').lean(),
  );
});

router.post('/activities/', async (request, response) => {
  response.status(201).json(await ActivityModel.create(request.body));
});

router.get('/leaderboard/', async (_request, response) => {
  response.json(
    await LeaderboardEntryModel.find()
      .sort({ points: -1 })
      .populate('user team')
      .lean(),
  );
});

router.post('/leaderboard/', async (request, response) => {
  response.status(201).json(await LeaderboardEntryModel.create(request.body));
});

router.get('/workouts/', async (_request, response) => {
  response.json(await WorkoutModel.find().sort({ name: 1 }).lean());
});

router.post('/workouts/', async (request, response) => {
  response.status(201).json(await WorkoutModel.create(request.body));
});

export default router;
