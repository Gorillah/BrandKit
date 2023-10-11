import { users } from "@/db/schema";
import { db } from "@/lib/db";
import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

const handler = async (req: NextApiRequest) => {
  const evt = req.body.evt as WebhookEvent;
  switch (evt.type) {
    case "user.created":
      // UserJSON.first_name is a string
      const firstName = evt.data.first_name;
      // UserJSON.last_name is a string
      const lastName = evt.data.last_name;
      // UserJSON.email_addresses is an array of EmailAddressJSON
      const emails = evt.data.email_addresses;

      await db.insert(users).values({
        id: parseInt(evt.data.id), // evt.data.id,
        name: `${firstName} ${lastName}`,
        email: emails[0].email_address,
        dailyLogoCount: 0,
      });
      console.log("user created!");
  }
};
