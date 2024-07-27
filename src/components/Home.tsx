import React from "react";
import RoomItem from "./room/RoomItem";
import { IRoom } from "@/backend/models/room";

interface Props {
  data: {
    roomCount: number;
    filteredRoomCount: number;
    resPerPage: number;
    success: boolean;
    rooms: IRoom[];
  };
}
const Home = ({ data }: Props) => {
  const { rooms, resPerPage, filteredRoomCount } = data;
  return (
    <div>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">All Rooms</h2>
        <a href="/search" className="ml-2 back-to-search">
          <i className="fa fa-arrow-left"></i> Back to Search
        </a>
        <div className="row mt-4">
          {rooms?.length === 0 ? (
            <div className="alert alert-danger mt-5 w-100">No Rooms</div>
          ) : (
            rooms?.map((room, index) => <RoomItem key={index} room={room}/>)
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
