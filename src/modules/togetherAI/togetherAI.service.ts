import config from "../../config/config";

const apiKey = config.togetherAI.apiKey;
const apiUrl = "https://api.together.xyz/v1/chat/completions";

const baseChatPrompt = `You are a helpful assistant on my blood donation website. I want you to answer the following question regarding blood donation in the most concise and simple way. If the question is not related to blood donation, please respond with "I can only answer questions related to blood donation." : `;

export class TogetherAIService {
  static async chatBot(prompt: string): Promise<string> {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
          messages: [{ role: "user", content: baseChatPrompt + prompt }],
        }),
      });
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error:", error);
      return "Error occurred";
    }
  }
}
