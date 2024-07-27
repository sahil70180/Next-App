import Home from "@/components/Home";
import Error from "./error";

const getRoomsData = async () => {
  const res = await fetch(`${process.env.API_URL}/api/rooms`, {
    cache: "no-cache",
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
