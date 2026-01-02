import userModel from "@/modules/user";
import AuthModel from "@/modules/signup";
import { NextResponse } from "next/server";
import { getUser } from "@/lib/getUser";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  await connectDB();
  const auth = await getUser();
  const user = await AuthModel.findOne({ email: auth.user.email });
  let isPaid = user.hasPaid;
  console.log(isPaid);

  const chatUser = await userModel.find({ Useremail: auth.user.email });
  // if (user.hasPaid == false) {
  //   return Response.json({ message: "notUpgraded" }, { status: 201 });
  // }
  // console.log("i am from mongodb", user);
  // console.log("i am from route", auth);
  // console.log("i am chatHistory ", chatUser);

  return Response.json(
    { success: true, chatUser, isPaid, showDone: user.hasPaid === true },
    { status: 201 }
  );
}

export async function POST(req) {
  await connectDB();
  const { name, title, number, email, skills, education, aboutYourself } =
    await req.json();

  const auth = await getUser();
  const user = await userModel.create({
    Useremail: auth.user.email,
    name,
    title,
    number,
    email,
    skills,
    education,
    aboutYourself,
    name,
    title,
    number,
    email,
    skills,
    education,
    aboutYourself,
  });

  // console.log(user);

  return Response.json({ success: true, user }, { status: 201 });
}
