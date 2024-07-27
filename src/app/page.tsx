import Home from "@/components/Home";
import Error from "./error";
import type { Metadata } from "next";

export const metaData: Metadata = {
  title: "HomePage - BookIT",
};

const getRoomsData = async () => {
  const res = await fetch(`${process.env.API_URL}/api/rooms`, {
    cache: "no-store",
  });
  return await res.json();
};

export default async function HomePage() {
  const data = await getRoomsData();
  if (data?.message) {
    return <Error error={data} />;
  }
  return (
    <div className="container">
      <Home data={data} />
    </div>
  );
}
