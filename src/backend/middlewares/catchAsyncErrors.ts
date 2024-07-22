import { NextRequest, NextResponse } from "next/server";

interface IValidationError {
  message: string;
}
type handlerFunction = (req: NextRequest, params: any) => Promise<NextResponse>;
export const catchAsyncErrors =
  (handler: handlerFunction) => async (req: NextRequest, params: any) => {
    try {
      return await handler(req, params);
    } catch (error: any) {
      //for invalid _id
      if (error?.name === "CastError") {
        error.message = `Resource not Found. Invalid ${error?.path}`;
        error.statusCode = 400;
      }
      if (error?.name === "ValidationError") {
        error.message = Object.values<IValidationError>(error.errors).map(
          (value) => value.message
        );
        error.statusCode = 400;
      }
      return NextResponse.json(
        {
          message: error?.message,
        },
        { status: error?.statusCode }
      );
    }
  };
