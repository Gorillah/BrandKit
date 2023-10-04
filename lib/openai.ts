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
            "you are an creative and helpful AI assistant capable of designing a logo for your users from a couple of input.",
        },
        {
          role: "user",
          content: `
          pleases generate a logo for ${dataFrom.company} the font of choice is ${dataFrom.fontStyle} and the color of choice is ${dataFrom.logoColor}, the logo style is ${dataFrom.logoStyle}. So make something based on this inputs and style.
          `
        },
      ],
    });
    const data = await response.json();
    const image_description = data.choices[0].message.content;
    return image_description as string;
  } catch (error) {
    throw error;
  }
}

export async function generateLogo() {}
