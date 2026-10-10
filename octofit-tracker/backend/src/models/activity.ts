import { model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'cycle', 'swim', 'strength', 'other'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, min: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const activity = model('Activity', activitySchema);
