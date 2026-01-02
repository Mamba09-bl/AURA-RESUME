import Suggestt from "./Suggestt";

export default async function ShowDetailsPage({ params }) {
  const { id } = await params; // ✅ NO await (Wait for params to resolve)

  const res = await fetch(`/api/suggest/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();
  // console.log("our", data);

  return <Suggestt resume={data.user} />;
}
