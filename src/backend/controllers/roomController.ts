import { NextRequest, NextResponse } from "next/server";

export const allRooms = async (req: NextRequest) => {
  return NextResponse.json(
    {
      message: "Hello from the controller in the route",
    },
    { status: 200 }
  );
};
