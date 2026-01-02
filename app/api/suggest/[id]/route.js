import userModel from "@/modules/user";
import { connectDB } from "@/lib/mongodb";
export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;
  const user = await userModel.findById(id);
  // console.log(user);

  return Response.json({ success: true, user }, { status: 200 });
}
