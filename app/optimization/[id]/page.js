import DetailsClient from "./DetailsClient";

export default async function ShowDetailsPage({ params }) {
  const { id } = await params; // ✅ NO await

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/detailResumes/${id}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  console.log(data);

  return <DetailsClient resume={data.user} />;
}
