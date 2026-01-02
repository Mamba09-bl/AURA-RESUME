import userModel from "@/modules/user";
import { getUser } from "@/lib/getUser";
import { connectDB } from "@/lib/mongodb";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;
  const auth = await getUser();
  const user = await userModel.findById(id);
  console.log("i am the usersere", auth);

  return Response.json({ success: true, user }, { status: 201 });
}
