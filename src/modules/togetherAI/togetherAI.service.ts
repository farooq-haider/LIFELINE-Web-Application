import config from "../../config/config";

const apiKey = config.togetherAI.apiKey;
const apiUrl = "https://api.together.xyz/v1/chat/completions";

const baseChatPrompt = `You are a helpful assistant on my blood donation website. I want you to answer the following question regarding blood donation in the most concise and simple way. If the question is not related to blood donation, please respond with "I can only answer questions related to blood donation." : `;

const baseEligibilityPrompt = `You are a helpful assistant on my blood donation website. I am giving you a list of blood donations made by a donor. It will be an object containing an array called bloodDonations and every element in it contains the data, location and volume of the donation. Treat it accordingly. I want you to check if the donor is eligible to get a verified tag or not. The criteria is: Minimum 3 Donations in the past 12 months.

At least 90 days gap between each donation.

Each donation must be ≥ 450 ml. 
If the donor is eligible, respond with "YES". If the donor is not eligible, respond with "NO". Only respond with YES or NO. Do not add any other text. If the data is not in the correct format, respond with "Invalid Data". Here is the data: `;

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

  static async eligibilityCheck(prompt: any): Promise<string> {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
          messages: [
            {
              role: "user",
              content: baseEligibilityPrompt + JSON.stringify(prompt),
            },
          ],
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
