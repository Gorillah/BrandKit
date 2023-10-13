import { db } from "@/lib/db";
import { userSubscriptions } from "@/drizzle/schema";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

const return_url = process.env.NEXT_BASE_URL + "/";

export async function POST(request: Request) {
  try {
    const { interval, subscriptionPlan, credits } = await request.json();
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
              name: "BrandKit " + subscriptionPlan,
              description: "Unlimited and high quality logo access",
            },
            unit_amount: getPrice(subscriptionPlan, interval),
            recurring: {
              interval,
            },
          },
          quantity: 1,
        },
      ],
      // subscription_data: {
      //   trial_period_days: 3,
      // },
      metadata: {
        userId: userId,
        subscriptionPlan,
        credits,
      },
    });
    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log("$Stripe Error", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

const subscriptionPlan = {
  free: "free",
  pro: "pro",
  business: "business",
};

// Interval options
const intervals = {
  monthly: "month",
  yearly: "year",
};

function getPrice(plan: string, interval: string) {
  if (plan === subscriptionPlan.pro && interval === intervals.monthly) {
    return 1500;
  } else if (plan === subscriptionPlan.pro && interval === intervals.yearly) {
    return 9600;
  } else if (
    plan === subscriptionPlan.business &&
    interval === intervals.monthly
  ) {
    return 2500;
  } else if (
    plan === subscriptionPlan.business &&
    interval === intervals.yearly
  ) {
    return 18000;
  }
}
