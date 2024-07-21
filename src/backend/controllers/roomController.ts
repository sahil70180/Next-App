import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";

export const allRooms = async (req: NextRequest) => {
  return NextResponse.json(
    {
      message: "Hello from the controller in the route",
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
