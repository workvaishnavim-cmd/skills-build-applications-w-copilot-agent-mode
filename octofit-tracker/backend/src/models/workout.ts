import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    activityType: {
      type: String,
      enum: ['run', 'cycle', 'swim', 'strength', 'other'],
      required: true,
    },
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

export const workout = model('Workout', workoutSchema);
