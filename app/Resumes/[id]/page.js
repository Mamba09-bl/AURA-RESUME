import Home from "../page";

export default async function ShowDetailsPage({ params }) {
  const { id } = await params; // ✅ NO await

  const res = await fetch(`/api/showResume/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();

  return <Home resume={data.user} />;
}
