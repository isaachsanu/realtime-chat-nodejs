import { Request, Response } from 'express';
import Room from '../models/Room';

export const createRoom = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;
  const room = new Room({ name });
  await room.save();
  res.send(room);
};

export const getRooms = async (req: Request, res: Response): Promise<void> => {
  const rooms = await Room.find();
  res.send(rooms);
};
