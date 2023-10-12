import { users } from "@/drizzle/schema";
import { db } from "@/lib/db";
import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { EventEmitter } from "stream";
import { IncomingHttpHeaders } from "http";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs";

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
    evt = wh.verify(JSON.stringify(payload), heads as IncomingHttpHeaders & WebhookRequiredHeaders) as Event;
  } catch (error) {
    console.error((error as Error).message);
    return new NextResponse("Something went wrong", { status: 500 });
  }

  const eventType: EventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, ...attributes } = evt.data;
    console.log(id);
    console.log(attributes);

    // if (!id) return new NextResponse("Id does not exist", { status: 400 });

    const email = email_addresses[0].email_address;

    const user = await db.insert(users).values({
      id,
      name: `${attributes.first_name} ${attributes.last_name}`,
      email,
      dailyLogoCount: 0,
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
