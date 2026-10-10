import mongoose from 'mongoose';
import {
  activity,
  leaderboard,
  team,
  user,
  workout,
} from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Seed the octofit_db database with test data.
async function seedDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    const userFixtures = [
      { username: 'maya-chen', name: 'Maya Chen', email: 'maya.chen@example.com' },
      { username: 'alex-rivera', name: 'Alex Rivera', email: 'alex.rivera@example.com' },
      { username: 'jordan-lee', name: 'Jordan Lee', email: 'jordan.lee@example.com' },
      { username: 'sam-taylor', name: 'Sam Taylor', email: 'sam.taylor@example.com' },
    ];

    const users = new Map<string, (typeof user)['prototype']>();
    for (const fixture of userFixtures) {
      const existingUser = await user.findOne({ username: fixture.username });
      const seededUser = existingUser
        ? await user.findOneAndUpdate(
            { _id: existingUser._id },
            { $set: fixture },
            { new: true, runValidators: true },
          )
        : await user.create(fixture);
      if (seededUser) users.set(fixture.username, seededUser);
    }

    const maya = users.get('maya-chen');
    const alex = users.get('alex-rivera');
    const jordan = users.get('jordan-lee');
    const sam = users.get('sam-taylor');
    if (!maya || !alex || !jordan || !sam) {
      throw new Error('Unable to load all seeded users.');
    }

    const teamFixtures = [
      {
        name: 'Trailblazers',
        description: 'A team for runners and outdoor explorers.',
        members: [maya._id, alex._id],
        points: 850,
      },
      {
        name: 'Core Crew',
        description: 'Building strength and consistency together.',
        members: [jordan._id, sam._id],
        points: 610,
      },
    ];

    const teams = new Map<string, (typeof team)['prototype']>();
    for (const fixture of teamFixtures) {
      const existingTeam = await team.findOne({ name: fixture.name });
      const seededTeam = existingTeam
        ? await team.findOneAndUpdate(
            { _id: existingTeam._id },
            { $set: fixture },
            { new: true, runValidators: true },
          )
        : await team.create(fixture);
      if (seededTeam) teams.set(fixture.name, seededTeam);
    }

    const trailblazers = teams.get('Trailblazers');
    const coreCrew = teams.get('Core Crew');
    if (!trailblazers || !coreCrew) {
      throw new Error('Unable to load all seeded teams.');
    }

    const activityFixtures = [
      {
        user: maya._id,
        type: 'run' as const,
        durationMinutes: 42,
        distanceKm: 7.2,
        calories: 410,
        date: new Date('2026-10-09T07:30:00.000Z'),
      },
      {
        user: maya._id,
        type: 'strength' as const,
        durationMinutes: 35,
        calories: 220,
        date: new Date('2026-10-07T17:00:00.000Z'),
      },
      {
        user: alex._id,
        type: 'cycle' as const,
        durationMinutes: 55,
        distanceKm: 21,
        calories: 520,
        date: new Date('2026-10-08T08:00:00.000Z'),
      },
      {
        user: jordan._id,
        type: 'strength' as const,
        durationMinutes: 48,
        calories: 310,
        date: new Date('2026-10-09T16:30:00.000Z'),
      },
      {
        user: jordan._id,
        type: 'run' as const,
        durationMinutes: 30,
        distanceKm: 4.8,
        calories: 285,
        date: new Date('2026-10-06T06:45:00.000Z'),
      },
      {
        user: sam._id,
        type: 'swim' as const,
        durationMinutes: 40,
        distanceKm: 1.5,
        calories: 360,
        date: new Date('2026-10-08T18:00:00.000Z'),
      },
    ];

    for (const fixture of activityFixtures) {
      const { user, type, date, ...activityValues } = fixture;
      const filter = { user, type, date };
      const existingActivity = await activity.findOne(filter);
      if (existingActivity) {
        await activity.findOneAndUpdate(
          { _id: existingActivity._id },
          { $set: { user, type, date, ...activityValues } },
          { new: true, runValidators: true },
        );
      } else {
        await activity.create({ user, type, date, ...activityValues });
      }
    }

    const leaderboardFixtures = [
      { user: maya._id, team: trailblazers._id, points: 460 },
      { user: alex._id, team: trailblazers._id, points: 390 },
      { user: jordan._id, team: coreCrew._id, points: 330 },
      { user: sam._id, team: coreCrew._id, points: 280 },
    ];

    for (const fixture of leaderboardFixtures) {
      const existingEntry = await leaderboard.findOne({ user: fixture.user });
      if (existingEntry) {
        await leaderboard.findOneAndUpdate(
          { _id: existingEntry._id },
          { $set: fixture },
          { new: true, runValidators: true },
        );
      } else {
        await leaderboard.create(fixture);
      }
    }

    const workoutFixtures = [
      {
        name: 'Steady State Run',
        description: 'A conversational-pace endurance run.',
        activityType: 'run' as const,
        difficulty: 'beginner' as const,
        durationMinutes: 30,
        targetMuscleGroups: ['legs', 'core'],
      },
      {
        name: 'Tempo Builder',
        description: 'Alternate tempo intervals with easy recovery.',
        activityType: 'run' as const,
        difficulty: 'intermediate' as const,
        durationMinutes: 40,
        targetMuscleGroups: ['legs', 'core'],
      },
      {
        name: 'Full Body Foundations',
        description: 'A balanced strength session with controlled movements.',
        activityType: 'strength' as const,
        difficulty: 'beginner' as const,
        durationMinutes: 35,
        targetMuscleGroups: ['chest', 'back', 'legs', 'core'],
      },
      {
        name: 'Indoor Cycling Intervals',
        description: 'Short cycling efforts paired with active recovery.',
        activityType: 'cycle' as const,
        difficulty: 'intermediate' as const,
        durationMinutes: 45,
        targetMuscleGroups: ['legs', 'glutes'],
      },
      {
        name: 'Technique Swim',
        description: 'A relaxed swim focused on efficient form.',
        activityType: 'swim' as const,
        difficulty: 'beginner' as const,
        durationMinutes: 30,
        targetMuscleGroups: ['shoulders', 'back', 'core'],
      },
    ];

    for (const fixture of workoutFixtures) {
      const existingWorkout = await workout.findOne({ name: fixture.name });
      if (existingWorkout) {
        await workout.findOneAndUpdate(
          { _id: existingWorkout._id },
          { $set: fixture },
          { new: true, runValidators: true },
        );
      } else {
        await workout.create(fixture);
      }
    }

    const [userCount, teamCount, activityCount, leaderboardCount, workoutCount] =
      await Promise.all([
        user.countDocuments(),
        team.countDocuments(),
        activity.countDocuments(),
        leaderboard.countDocuments(),
        workout.countDocuments(),
      ]);
    console.log(
      `Database seeding complete: ${userCount} users, ${teamCount} teams, ` +
        `${activityCount} activities, ${leaderboardCount} leaderboard entries, ` +
        `${workoutCount} workouts.`,
    );
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error disconnecting from octofit_db:', error);
  process.exitCode = 1;
});
