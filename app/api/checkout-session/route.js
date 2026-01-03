import Stripe from "stripe";
import signup from "@/modules/signup";
import user from "@/modules/user";
import { getUser } from "@/lib/getUser";
import userModel from "@/modules/user";
import { connectDB } from "@/lib/mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await connectDB();
  const { email } = await req.json();
  const auth = await getUser();
  const user = await userModel.findOne({ Useremail: auth.user.email });
  console.log("iamuserere", user);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "AlphaPlus Subscription" },
          unit_amount: 4999,
        },
        quantity: 1,
      },
    ],
    success_url: `${
      process.env.NEXTAUTH_URL
    }/payment-success?email=${encodeURIComponent(email)}&amount=49.99&userId=${
      user._id
    }`,
    cancel_url: `${process.env.NEXTAUTH_URL}/plus`,
  });

  return new Response(JSON.stringify({ url: session.url }), { status: 200 });
}
