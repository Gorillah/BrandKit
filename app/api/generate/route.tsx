import { NextRequest, NextResponse } from "next/server"
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { useRouter } from 'next/router'

const llm = new OpenAI({ temperature: 0.5, openAIApiKey: process.env.OPENAI_API_KEY });
const prompt = PromptTemplate.fromTemplate(
  "make me a logo for {product}?"
);
const chain = new LLMChain({ llm, prompt });

export default async function POST(req: NextRequest, res: NextResponse) {
    try {
        const reqBody = JSON.stringify(req.body)
        const res = await chain.run("fish");
        return res
    } catch (error: any) {
        throw new Error(error)
    }

}