import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>('User', UserSchema);
