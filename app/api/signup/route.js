import signup from "@/modules/signup";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

const secret = "MY_SUPER_SECRET_123";
export async function POST(req) {
  await connectDB();
  const { username, email, password } = await req.json();
  const exiting = await signup.findOne({ email });
  if (exiting)
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 400 }
    );
  const hash = await bcrypt.hash(password, 10);
  const user = await signup.create({ username, email, password: hash });

  const token = jwt.sign({ id: user._id, email: user.email }, secret);
  const res = NextResponse.json({ success: true }, { status: 201 });
  console.log(user);

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: true, // must be true in production (HTTPS)
    sameSite: "none", // allows cross-site redirect cookie (Stripe checkout)
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return res;
}
