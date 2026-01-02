import userModel from "@/modules/user";
import { connectDB } from "@/lib/mongodb";

export async function GET(req) {
  await connectDB();
  const user = await userModel.find();
  // console.log(user);

  return Response.json({ success: true, user }, { status: 201 });
}
