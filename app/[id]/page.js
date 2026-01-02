import suggestClient from "./suggestClient";
export default async function ShowDetailsPage({ params }) {
  const { id } = await params; // ✅ NO await

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/improveResumes/${id}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return <suggestClient resume={data.user} />;
}
