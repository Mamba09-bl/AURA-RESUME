import userModel from "@/modules/user";
import { connectDB } from "@/lib/mongodb";

export async function POST(req, { params }) {
  await connectDB();
  const { id } = await params;
  const { content, changeValue, section } = await req.json();

  const user = await userModel.findByIdAndUpdate(
    id,
    { [section]: changeValue },
    { new: true }
  );
  console.log(section, ":", changeValue);
  console.log("edited user", user);

  return Response.json({ success: true, user });
}
