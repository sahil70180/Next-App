import { NextRequest, NextResponse } from "next/server";
import Room, { IRoom } from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import ApiFilters from "../utils/apiFilters";

export const allRooms = catchAsyncErrors(async (req: NextRequest) => {
  // const rooms = await Room.find();
  // const totalRooms = rooms.length;

  // getting query string
  const { searchParams } = new URL(req.url);

  const queryStr: any = {};

  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  });

  // throw new ErrorHandler("Hello", 404)

  const resPerPage = 4;
  const roomCount: number = await Room.countDocuments();

  const apiFilters = new ApiFilters(Room, queryStr).search().filter();

  let rooms: IRoom[] = await apiFilters.query;

  const filteredRoomCount = rooms.length;

  apiFilters.pagination(resPerPage);
  rooms = await apiFilters.query.clone();
  // const totalResults = rooms.length;

  return NextResponse.json(
    {
      // totalResults,
      success: true,
      roomCount,
      filteredRoomCount,
      resPerPage,
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
    room,
  });
});

export const getRoomDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

export const updateRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const body = await req.json();
    let room = await Room.findById(params.id);

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    room = await Room.findByIdAndUpdate(params?.id, body, { new: true });

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

export const deleteRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    await room.deleteOne();

    return NextResponse.json({
      success: true,
    });
  }
);
