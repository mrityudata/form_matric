import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  name: string;
  order: number;
}

const ClientSchema: Schema = new Schema({
  name: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IClient>('Client', ClientSchema);
