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

export default function PriceTable() {
  const [Yearly, setYearly] = useState(true);

  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "1 Logo, 1 Social Media Post",
      color: "bg-gray-200",
      textColor: "text-black",
      features: [
        "2 Daily Logos Generation Limit",
        "525 x 525px Quality Logo",
        "Watermarked Logo",
      ],
    },
    {
      name: "Basic",
      price: Yearly ? "$6" : "$11",
      description: "1 Logo, 1 Social Media Post",
      color: "bg-gray-200",
      textColor: "text-black",
      features: [
        "25 Daily Generation Limit",
        "High Quality Logo",
        "Watermarked Removed",
      ],
    },
    {
      name: "Premium",
      price: Yearly ? "$12" : "$20",
      color: "bg-gray-200",
      textColor: "text-black",
      description: "1 Logo, 1 Social Media Post",
      features: [
        "Unlimited Daily Generation Limit",
        "Highest Quality Logo",
        "Watermarked Removed",
      ],
    },
  ];

  return (
    <div id="price" className="flex flex-col gap-4">
      <div className="flex justify-center gap-4 place-items-baseline">
        <p className="text-2xl text-bold">Monthly</p>
        <Switch checked={Yearly} onCheckedChange={() => setYearly(!Yearly)} />
        <p className="text-2xl text-bold">Yearly</p>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[500px] justify-center">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={cn(
              "flex flex-col justify-around",
              plan.color,
              plan.textColor,
            )}
          >
            <CardHeader>
              <CardTitle className="text-5xl text-slate-950">
                {plan.price}
              </CardTitle>
              <CardTitle className="text-4xl text-slate-950">
                {plan.name}
              </CardTitle>
              <CardDescription className={cn("text-xl", plan.textColor)}>
                {plan.description}
              </CardDescription>
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
  /* <div key={index} className="bg-gray-200 flex flex-col gap-2 p-6 justify-between rounded-md">
<p className="text-5xl">{plan.price}</p>
<p className="text-4xl">{plan.name}</p>
<p className="text-xl">{plan.description}</p>
<hr/>
<ul>
  {plan.features.map((feature, index) => (
    <li className="text-lg" key={index}>{feature}</li>
  ))}
</ul>
<Button className="w-full">Start Free Trial</Button>
</div> */
}
