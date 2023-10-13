import { users } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { IncomingHttpHeaders } from "http";
import { NextResponse } from "next/server";
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || "";

const handler = async (req: Request) => {
  // const evt = req.body.evt as WebhookEvent;
  const payload = await req.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id") as string,
    "svix-timestamp": headersList.get("svix-timestamp") as string,
    "svix-signature": headersList.get("svix-signature") as string,
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (error) {
    console.error((error as Error).message);
    return new NextResponse("Something went wrong", { status: 500 });
  }

  const eventType: EventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, ...attributes } = evt.data;
    // console.log(id);
    // console.log(attributes);

    const email = email_addresses[0].email_address;

    const user = await db.insert(users).values({
      id,
      name: `${attributes.first_name} ${attributes.last_name}`,
      email,
      credit: 2,
    });
  }
};

type EventType = "user.created" | "user.updated";

type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: EventType;
};

export const POST = handler;
