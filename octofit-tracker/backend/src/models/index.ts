import { model, Schema, Types } from 'mongoose';

interface User {
  username: string;
  name: string;
  email: string;
}

interface Team {
  name: string;
  description?: string;
  members: Types.ObjectId[];
  points: number;
}

interface Activity {
  user: Types.ObjectId;
  type: 'run' | 'cycle' | 'swim' | 'strength' | 'other';
  durationMinutes: number;
  distanceKm?: number;
  calories?: number;
  date: Date;
}

interface LeaderboardEntry {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  points: number;
}

interface Workout {
  name: string;
  description?: string;
  activityType: 'run' | 'cycle' | 'swim' | 'strength' | 'other';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  targetMuscleGroups: string[];
}

const activityTypes = ['run', 'cycle', 'swim', 'strength', 'other'] as const;

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  },
  { timestamps: true },
);

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true },
);

const activitySchema = new Schema<Activity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: activityTypes, required: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, min: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema<LeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
);

const workoutSchema = new Schema<Workout>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    activityType: { type: String, enum: activityTypes, required: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    targetMuscleGroups: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export const UserModel = model<User>('User', userSchema);
export const TeamModel = model<Team>('Team', teamSchema);
export const ActivityModel = model<Activity>('Activity', activitySchema);
export const LeaderboardEntryModel = model<LeaderboardEntry>(
  'LeaderboardEntry',
  leaderboardEntrySchema,
);
export const WorkoutModel = model<Workout>('Workout', workoutSchema);
