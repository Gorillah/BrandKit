import { db } from "@/lib/db";
import { userSubscriptions } from "@/drizzle/schema";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

const return_url = process.env.NEXT_BASE_URL + "/";

export async function POST(request: Request) {
  try {
    const { interval } = await request.json();
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const _userSubscriptions = await db
      .select()
      .from(userSubscriptions)
      .where(eq(userSubscriptions.userId, userId));

    if (_userSubscriptions[0] && _userSubscriptions[0].stripeCustomerId) {
      // Trying to cancel a subscription
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: _userSubscriptions[0].stripeCustomerId,
        return_url,
      });
      return NextResponse.json({ url: stripeSession.url });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: return_url,
      cancel_url: return_url,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user?.emailAddresses?.[0]?.emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "BrandKit Premium",
              description: "Unlimited and high quality logo access",
            },
            unit_amount: 1000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 3,
      },
      metadata: {
        userId: userId,
      },
    });
    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log("$Stripe Error", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
