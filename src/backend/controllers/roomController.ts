import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

export const allRooms = catchAsyncErrors(async (req: NextRequest) => {
  const rooms = await Room.find();
  const totalRooms = rooms.length;

  return NextResponse.json(
    {
      success: true,
      totalRooms,
      message: "All Rooms",
      rooms,
    },
    { status: 200 }
  );
});

export const newRoom = catchAsyncErrors(async (req: NextRequest) => {
  const data = await req.json();
  const room = await Room.create(data);

  return NextResponse.json({
    success: true,
    message: "Room Created",
    room,
  });
});

export const getRoomDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);

    throw new ErrorHandler("Error by catch", 400);
    if (!room) {
      return NextResponse.json(
        {
          message: "No room found with this id",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Room Found with this id",
      room,
    });
  }
);

export const updateRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const body = await req.json();
    let room = await Room.findById(params.id);

    if (!room) {
      return NextResponse.json(
        {
          message: "No room found with this id",
        },
        { status: 404 }
      );
    }

    room = await Room.findByIdAndUpdate(params?.id, body, { new: true });

    return NextResponse.json({
      success: true,
      message: "Room Updated Success",
      room,
    });
  }
);

export const deleteRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);

    if (!room) {
      return NextResponse.json(
        {
          message: "No room found with this id",
        },
        { status: 404 }
      );
    }

    await room.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Room Deleted Success",
    });
  }
);
