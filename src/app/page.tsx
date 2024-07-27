import Home from "@/components/Home";
import Error from "./error";
import type { Metadata } from "next";

export const metaData: Metadata = {
  title: "HomePage - BookIT",
};

const getRoomsData = async (searchParams : string) => {
  const urlParams = new URLSearchParams(searchParams);
  const queryStr = urlParams.toString();

  const res = await fetch(`${process.env.API_URL}/api/rooms?${queryStr}`, {
    cache: "no-store",
  });
  return await res.json();
};

export default async function HomePage({searchParams} : {searchParams : string}) {
  // console.log(searchParams)
  const data = await getRoomsData(searchParams);
  if (data?.message) {
    return <Error error={data} />;
  }
  return (
    <div className="container">
      <Home data={data} />
    </div>
  );
}
