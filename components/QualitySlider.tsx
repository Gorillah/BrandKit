"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useState, FormEvent } from "react";

type QualitySliderProps = {
  quality: number[];
  setQuality: React.Dispatch<React.SetStateAction<number[]>>;
};

type isSub = { isSub: boolean };

export default function QualitySlider({
  quality,
  setQuality,
  isSub,
}: QualitySliderProps & isSub) {
  return (
    <div className="text-md pb-4 flex flex-col gap-3">
      <Label className="text-left" htmlFor="quality">{quality[0].toString() + " px"}</Label>
      <Slider
        onValueChange={(value) => setQuality(value)}
        min={525}
        max={2000}
        step={135}
        id="quality"
        disabled={!isSub}
      />
      {!isSub && (
        <p className="text-sm pt-2 text-gray-500 text-left">
          Free account can only download 525px, upgrade to increase and to
          remove watermark
        </p>
      )}
    </div>
  );
}
