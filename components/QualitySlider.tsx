"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useState, FormEvent } from "react";

type QualitySliderProps = {
  quality: number[];
  setQuality: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function QualitySlider({
  quality,
  setQuality,
}: QualitySliderProps) {
  return (
    <div>
      <Label htmlFor="quality">{quality[0].toString() + " px"}</Label>
      <Slider
        onValueChange={(value) => setQuality(value)}
        min={525}
        max={2000}
        step={135}
        id="quality"
      />
    </div>
  );
}
