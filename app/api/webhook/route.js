import Stripe from "stripe";
import { headers } from "next/headers";
import signup from "@/modules/signup";
import { connectDB } from "@/lib/mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  // ✅ ALWAYS connect DB in production
  await connectDB();

  const body = await req.text();

  const headerList = await headers();
  const signature = headerList.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.customer_email;

    if (email) {
      await signup.findOneAndUpdate(
        { email },
        { $set: { hasPaid: true, freeMessagesUsed: 0 } }
      );
    }

    console.log("✅ Payment successful:", email);
  }

  return new Response("OK", { status: 200 });
}
