import userModel from "@/modules/user";
import { connectDB } from "@/lib/mongodb";
export async function POST(req, { params }) {
  await connectDB();
  const { id } = await params;
  console.log(id);
  const user = await userModel.findById(id);
  console.log(user);

  const { content, section } = await req.json();
  const updatedUser = await userModel.findByIdAndUpdate(
    id,
    { [section]: content },
    { new: true }
  );
  console.log("i am from backend", updatedUser);

  return Response.json({ success: true, updatedUser }, { status: 200 });
}
