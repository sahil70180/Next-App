import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";

export const allRooms = async (req: NextRequest) => {
  const rooms = await Room.find();
  const totalRooms = rooms.length;

  return NextResponse.json(
    {
      success: true,
      totalRooms,
      rooms,
    },
    { status: 200 }
  );
};

export const newRoom = async (req: NextRequest) => {
  const data = await req.json();
  const room = await Room.create(data);

  return NextResponse.json({
    success: true,
    room,
  });
};
