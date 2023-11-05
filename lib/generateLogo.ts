import axios from "axios";
import { NextResponse } from "next/server";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default async function generateImage(
  company: string,
  style: string[],
  color: string[],
  font: string[],
): Promise<any> {
  try {
    const prompt = `
    Generate a logo for ${company} using DALL·E.

    Design Instructions:
    - Use {color} palette.
    - Apply {font} style for text.
    - Create a {logo_style} character-inspired logo.
    - Include ${company} name stylishly.
    - Emphasize clean lines and high resolution.
    
    Design Principles:
    - Only provide 1 concept.
    - Prioritize simplicity and memorability.
    - Avoid trends; aim for timelessness.
    - Ensure versatility in different sizes.
    - Reflect brand identity and distinctiveness.
    - Maintain legibility and consistency.
    - Use color strategically; allow spacing.
    
    Avoid:
    - keep it simple.
    - Following trends; opt for timelessness.
    - Illegibility when scaled down.
    - Losing meaning in monochrome.
    - Crowding the logo; allow spacing.

    Choose:
    - {color}: ${color}
    - {font}: ${font}
    - {logo_style}: ${style}
    
  `;

    const response: any = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt,
        n: 1,
        size: "512x512",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      },
    );

    // Extract the image URL from the OpenAI API response data.
    const imageURL = response.data?.data.map((image: any) => {
      return image.url;
    });

    if (!imageURL) {
      throw new Error("Image URL not found in response");
    }

    // Return the image URL in a consistent response format.
    return { imageURL };
  } catch (error) {
    console.error("Error generating image:", error);
    return { error: `${error}` };
  }
}
