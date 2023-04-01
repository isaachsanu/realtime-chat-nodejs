import mongoose, { Document } from 'mongoose';

export interface IRoom extends Document {
  name: string;
  participants: string[];
}

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  participants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: true,
  },
});

export default mongoose.model<IRoom>('Room', RoomSchema);
