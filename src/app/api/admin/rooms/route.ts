import dbConnect from "@/backend/config/bdConnect";
import { newRoom } from "@/backend/controllers/roomController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.post(newRoom);

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
