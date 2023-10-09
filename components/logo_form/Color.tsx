import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useFormData } from "@/store/createLogo";

const ColorScheme = [
  "/logoColors/cool_color_scheme.webp",
  "/logoColors/warm_color_scheme.webp",
  "/logoColors/metallic_color_scheme.webp",
  "/logoColors/purple_color_scheme.webp",
  "/logoColors/neon_color_scheme.webp",
  "/logoColors/earth_color_scheme.webp",
];

function Color() {
  const { logoColor, setLogoColor, removelogoColor } = useFormData();

  return (
    <div>
      <div className="py-4">
        <h1 className="text-xl font-bold lg:text-3xl">
          Select color schemes that matches your brand
        </h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 w-fit mx-auto">
        {ColorScheme.map((color: string, i) => (
          <div
            key={i}
            onClick={() => {
              const index = logoColor.findIndex((f: String) => f === color);
              if (index > -1) {
                removelogoColor(color);
              } else {
                setLogoColor(color);
              }
            }}
            className={cn(
              logoColor.includes(color)
                ? "border-4 border-[#2F2FA2]"
                : "border-4 border-transparent border-gray-200",
              " hover:cursor-pointer transition flex justify-center items-center hover:scale-[102%] overflow-hidden rounded-[14px]",
            )}
          >
            <div className="w-[550px]">
              <AspectRatio ratio={1 / 1}>
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  key={i}
                  src={color}
                  alt="logo"
                  loading="lazy"
                />
              </AspectRatio>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Color;
