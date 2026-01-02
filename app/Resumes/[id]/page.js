import Home from "../page";

export default async function ShowDetailsPage({ params }) {
  const { id } = await params; // ✅ NO await

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/showResume/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return <Home resume={data.user} />;
}
