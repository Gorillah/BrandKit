// /api/stripe
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const logoId = await request.json() as string;
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_email: user?.emailAddresses?.[0]?.emailAddress,
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Premium Logo",
              description: "High Quality Premium Logo",
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      metadata: {
        logoId: logoId,
      },
      success_url: `${process.env.NEXT_BASE_URL}/`,
      cancel_url: `${process.env.NEXT_BASE_URL}/`,
    });
console.log("api/stripe", logoId)
    return NextResponse.json({url:stripeSession.url});
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
