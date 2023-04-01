import mongoose, { Document } from 'mongoose';

export interface IMessage extends Document {
  room: string;
  senderId: string;
  message: string;
  messageType: MessageType;
  createdAt: Date;
}

const MessageSchema = new mongoose.Schema({
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IMessage>('Message', MessageSchema);
