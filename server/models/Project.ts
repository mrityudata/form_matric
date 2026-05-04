import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  category: string;
  imageUrl: string;
  videoUrl: string;
  description: string;
  year: string;
  role: string;
  aspectRatio: string;
  order: number;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  videoUrl: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: String, required: true },
  role: { type: String, required: true },
  aspectRatio: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);
