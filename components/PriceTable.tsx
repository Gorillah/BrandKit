import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function PriceTable() {
  const [Yearly, setYearly] = useState(true);

  const plans = [
    {
      name: "Starter",
      price: Yearly ? "$5" : "$8",
      description: "1 Logo, 1 Social Media Post",
      color: "bg-gray-200",
      textColor: "text-black",
      features: [
        "Limited logo designs per month (12 logos)",
        "525 x 525px Quality Logo",
        "Commercial use license",
        "Advanced customization options",
      ],
    },
    {
      name: "Basic",
      price: Yearly ? "$9" : "$15",
      description: "1 Logo, 1 Social Media Post",
      color: "bg-gray-200",
      textColor: "text-black",
      features: [
        "Limited logo designs per month (40 logos)",
        "1500 x 1500px Quality Logo",
        "Commercial use license",
        "Advanced customization options",
      ],
    },
    {
      name: "Premium",
      price: Yearly ? "$15" : "$25",
      color: "bg-gray-200",
      textColor: "text-black",
      description: "1 Logo, 1 Social Media Post",
      features: [
        "Unlimited logo designs per month",
        "Highest Quality Logo",
        "Extended commercial use license",
        "Advanced customization options",
        "White-labeling options",
        "Priority support",
        "Premium design templates",
      ],
    },
  ];

  return (
    <div id="price" className="flex flex-col gap-4">
      <h2 className="text-3xl text-center font-semibold">Choose Your Plan</h2>
      <div className="flex justify-center gap-4 items-center">
        <p className="text-xl text-bold">Monthly</p>
        <Switch checked={Yearly} onCheckedChange={() => setYearly(!Yearly)} />
        <p className="text-xl text-bold">Yearly</p>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[500px] justify-center">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={cn("flex flex-col justify-around shadow-md shadow-black/30", plan.color, plan.textColor)}
          >
            <CardHeader>
              <CardTitle className="text-5xl text-slate-950">
                {plan.price}
                <span className="text-sm font-light">/ Monthly</span>
              </CardTitle>
              <CardTitle className="text-4xl text-slate-950">{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2 text-lg">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Start Free Trial</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

{
}
