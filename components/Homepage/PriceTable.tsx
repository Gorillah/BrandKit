"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import axios from "axios";

export default function PriceTable() {
  const [Yearly, setYearly] = useState(true);

  const subscriptionPlan = {
    free: "free",
    pro: "pro",
    business: "business",
  };

  const plans = [
    {
      name: "Starter",
      subscriptionPlan: subscriptionPlan.free,
      price: Yearly ? "Free" : "Free",
      credits: 2,
      description: "1 Logo, 1 Social Media Post",
      color: "bg-gray-200",
      textColor: "text-black",
      features: [
        "2 Credits",
        "525 x 525px Quality",
        "Personal use license",
        "No customization options",
        "Watermarked",
      ],
      Button: "Create Account",
      url: "/sign-up",
    },
    {
      name: "Pro",
      subscriptionPlan: subscriptionPlan.pro,
      price: Yearly ? "$9" : "$15",
      credits: 15,
      description: "1 Logo, 1 Social Media Post",
      color: "bg-gray-200",
      textColor: "text-black",
      features: [
        "15 Credits",
        "1500 x 1500px Quality",
        "Commercial use license",
        "Advanced customization options",
      ],
      Button: "Start Free Trial",
      url: "/api/stripe",
    },
    {
      name: "Business",
      subscriptionPlan: subscriptionPlan.business,
      price: Yearly ? "$15" : "$25",
      credits: 30,
      color: "bg-gray-200",
      textColor: "text-black",
      description: "1 Logo, 1 Social Media Post",
      features: [
        "30 Credits",
        "Highest Quality Logo",
        "Extended commercial use license",
        "Advanced customization options",
        "White-labeling options",
        "Priority support",
        "Premium design templates",
      ],
      Button: "Start Free Trial",
      url: "/api/stripe",
    },
  ];

  const handleSubsciption = async (
    subscriptionPlan: string,
    url: string,
    credits: number
  ) => {
    const res = await axios.post(url, {
      subscriptionPlan,
      credits,
      interval: Yearly ? "year" : "month",
    });
    window.location.href = res.data.url;
  };

  return (
    <div id="price" className="flex flex-col gap-4">
      <h2 className="text-3xl text-center font-semibold">Choose Your Plan</h2>
      <div className="flex justify-center gap-4 items-center">
        <p className="text-xl text-bold">Monthly</p>
        <Switch checked={Yearly} onCheckedChange={() => setYearly(!Yearly)} />
        <p className="text-xl text-bold">Yearly</p>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[500px] justify-start">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={cn(
              "flex flex-col justify-around shadow-md shadow-black/30",
              plan.color,
              plan.textColor
            )}
          >
            <CardHeader>
              <CardTitle className="text-5xl text-slate-950">
                {plan.price}
                <span className="text-sm font-light">/ Monthly</span>
              </CardTitle>
              <CardTitle className="text-4xl text-slate-950">
                {plan.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2 text-lg">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() =>
                  handleSubsciption(
                    plan.subscriptionPlan,
                    plan.url,
                    plan.credits
                  )
                }
              >
                {plan.Button}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

{
}
