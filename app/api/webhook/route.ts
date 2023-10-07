import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { logos } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SIGNING_SECRET as string
    );
  } catch (error) {
    return new NextResponse("webhook error", {
      status: 400,
    });
}

const session = event.data.object as Stripe.Checkout.Session;
  if (event.type === "invoice.payment_succeeded") {
    await db
      .update(logos)
      .set({
        isPaid: 1,
      })
      .where(eq(logos.id, parseInt(session?.metadata?.logoId!)));
  }
  return new NextResponse(
      null, {
        status: 200
      }
  )
}
