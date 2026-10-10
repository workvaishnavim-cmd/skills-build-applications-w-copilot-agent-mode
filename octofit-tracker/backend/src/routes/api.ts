import { Router } from 'express';
import {
  activity,
  leaderboard,
  team,
  user,
  workout,
} from '../models/index.js';

const router = Router();

router.get('/api/users/', async (_request, response) => {
  response.json(await user.find().sort({ name: 1 }).lean());
});

router.post('/api/users/', async (request, response) => {
  response.status(201).json(await user.create(request.body));
});

router.get('/api/teams/', async (_request, response) => {
  response.json(await team.find().sort({ name: 1 }).populate('members').lean());
});

router.post('/api/teams/', async (request, response) => {
  response.status(201).json(await team.create(request.body));
});

router.get('/api/activities/', async (_request, response) => {
  response.json(
    await activity.find().sort({ date: -1 }).populate('user').lean(),
  );
});

router.post('/api/activities/', async (request, response) => {
  response.status(201).json(await activity.create(request.body));
});

router.get('/api/leaderboard/', async (_request, response) => {
  response.json(
    await leaderboard
      .find()
      .sort({ points: -1 })
      .populate('user team')
      .lean(),
  );
});

router.post('/api/leaderboard/', async (request, response) => {
  response.status(201).json(await leaderboard.create(request.body));
});

router.get('/api/workouts/', async (_request, response) => {
  response.json(await workout.find().sort({ name: 1 }).lean());
});

router.post('/api/workouts/', async (request, response) => {
  response.status(201).json(await workout.create(request.body));
});

export default router;
