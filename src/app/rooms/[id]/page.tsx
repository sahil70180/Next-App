import Error from "@/app/error";
import RoomDetailsPage from "@/components/room/RoomDetails";
import { Metadata } from "next";
import React from "react";
export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}
export const metaData: Metadata = {
  title: "Hello",
};
const getRoomDetails = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/api/rooms/${id}`);
  return res.json();
};

export default async function RoomDetail({ params }: Props) {
  const data = await getRoomDetails(params?.id);
  if (data?.message) {
    return <Error error={data} />;
  }
  return <RoomDetailsPage data={data} />;
}
