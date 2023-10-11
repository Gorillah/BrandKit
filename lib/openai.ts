import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function generateLogoPrompt(dataFrom: formData) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. Your role is to generate clear, detailed text prompts that will be used as inputs for an AI image generation system. The goal is to produce high-quality logo images based on the user's preferences For example, if a user provides the company name 'Sunny Skies Solar', specifies the colors blue and yellow, requests a modern geometric style, and wants the modern font",
        },
        {
          role: "user",
          content: `
          generate a logo for ${dataFrom.company} the font of choice is ${dataFrom.fontStyle} and the color of choice is ${dataFrom.logoColor}, the logo style is ${dataFrom.logoStyle}. So make something based on this inputs and style be creative and use the best logo designing tips and tricks to make it stand out.
          `,
        },
      ],
      max_tokens: 400,
    });
    const data = await response.json();
    const logo_description = data.choices[0].message.content;
    return logo_description as string;
  } catch (error) {
    throw error;
  }
}

export async function generateLogo(logo_description: string) {
  try {
    const response = await openai.createImage({
      prompt: logo_description,
      n: 1,
      size: "256x256",
    });
    const data = await response.json();
    console.log(data);
    const image_url = data.data[0].url;
    return image_url as string;
  } catch (error) {
    console.error(error);
  }
}
