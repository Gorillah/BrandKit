import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { userSubscriptions, users } from "@/drizzle/schema";

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
  if (!session?.metadata)
    return new NextResponse("Metadata is Not found", { status: 404 });

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    if (!session?.metadata?.userId!)
      return new NextResponse("Metadata userId is Not found", { status: 404 });
    await db.insert(userSubscriptions).values({
      userId: session.metadata.userId,
      plan: session.metadata.subscriptionPlan,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    });
    await db
      .update(users)
      .set({
        credit: sql`credit + ${session.metadata.credits}`,
      })
      .where(eq(users.id, session.metadata.userId));
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    await db
      .update(userSubscriptions!)
      .set({
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      })
      .where(eq(userSubscriptions.userId, session?.metadata?.userId!));
  }

  if (event.type === "customer.subscription.updated") {
    // const sub = await db
    //   .update(userSubscriptions)
    //   .set({
    //     plan: "active",
    //     stripePriceId: session.plan.id,
    //     stripeCurrentPeriodEnd: session.current_period_end,
    //   })
    //   .where(eq(userSubscriptions.stripeSubscriptionId, session.id));
    // console.log(session);
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    console.log(session);
    await db
      .delete(userSubscriptions)
      .where(eq(userSubscriptions.stripeSubscriptionId, subscription.id));
  }

  return new NextResponse(null, {
    status: 200,
  });
}
