import React from "react";
import { cn } from "@/lib/utils";
import { BadgeHelp, Blocks, Bot, FileStack, Loader2 } from "lucide-react";

const features = [
  {
    label: "Advanced AI Logo Creator",
    desc: "Our AI generates 100% unique logo concepts personalized to your brand style. No copied designs.",
    img: Bot,
  },
  {
    label: "Unlimited Revisions",
    desc: "Not happy? Get unlimited revisions for your one-of-a-kind logo.",
    img: FileStack,
  },
  {
    label: "Seamless Integrations",
    desc: "Export your unique logo and brand assets with one click.",
    img: Blocks,
  },
  {
    label: "24/7 Customer Support",
    desc: "Design experts available around the clock to help customize your unique brand identity.",
    img: BadgeHelp,
  },
];

export default function Advantages() {
  return (
    <div className="container flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-3xl font-bold text-center">Brand Logo Design</h3>
        <p className="max-w-2xl text-center text-lg lg:text-xl mx-auto">
          BrandKit is a brand building platform that can help you create professional logos, design matching identities,
          and automate brand promotion with on-brand social media content.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-fit gap-4 ">
        {features.map((feature, idx) => (
          <div
            className={cn(
              idx % 2 === 0 ? "flex-row" : "flex-row-reverse md:flex-row",
              "w-full flex gap-2 px-6 min-h-[200px] rounded-lg text-white bg-[#2127b3] shadow-md shadow-black/50"
            )}
            key={idx}
          >
            <div className="w-1/4 flex items-center justify-center">
              <feature.img size={80} />
            </div>
            <div className="w-3/4 flex flex-col justify-center gap-3">
              <h3 className="text-xl font-bold">{feature.label}</h3>
              <p className="text-md">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
