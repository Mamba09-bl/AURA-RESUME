// "use client";
// import { useEffect, useState } from "react";

// export default async function ShowDetailsPage({ params }) {
//   const { id } = await params;
//   useEffect(() => {
//     async function fetchDetails() {
//       const res = await fetch(`/api/detailResumes/${id}`);
//       const result = await res.json();
//       console.log(result);
//     }
//     fetchDetails();
//   }, []);

//   return <div>Resume ID: {id}</div>;
// }

import DetailsClient from "./DetailsClient";

export default async function ShowDetailsPage({ params }) {
  const { id } = await params; // ✅ NO await

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/detailResumes/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return <DetailsClient resume={data.user} />;
}
