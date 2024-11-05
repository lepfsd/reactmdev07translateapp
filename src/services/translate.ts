import { type FromLanguage, type Language } from "../types.d"
import { Cohere } from "@langchain/cohere";
import { PromptTemplate } from "@langchain/core/prompts";
import { SUPPORTED_LANGUAGES } from "../constants";

const llm = new Cohere({
    model: "command",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    apiKey: import.meta.env.VITE_COHERE_API_KEY,
    // other params...
  });
export async function translate({
    fromLanguage,
    toLanguage,
    text
  }: {
    fromLanguage: FromLanguage
    toLanguage: Language
    text: string
  }){
    if(fromLanguage == toLanguage || text === '') return text
    const toCode = SUPPORTED_LANGUAGES[toLanguage]
    const prompt = new PromptTemplate({
        template: `How to say ${text} in ${toCode}:\n`,
        inputVariables: [text, toCode],
    })
    const chain = prompt.pipe(llm)
    return await chain.invoke({
        output_language: toCode,
        input: text,
    })
}