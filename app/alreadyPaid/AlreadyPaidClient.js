"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function AlreadyPaidClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("userId");

  if (!id) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button onClick={() => router.push(`/Resumes/${id}`)}>Go Back</button>
    </div>
  );
}
