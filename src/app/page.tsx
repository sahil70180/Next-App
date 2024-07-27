import Home from "@/components/Home";

const getRoomsData = async () => {
  const res = await fetch("http://localhost:3000/api/rooms", {cache : "no-cache"});
  return await res.json();
};
export default async function HomePage() {
  const rooms = await getRoomsData();
  console.log("rooms :", rooms.message);
  return (
    <div className="container">
      <Home />
    </div>
  );
}
