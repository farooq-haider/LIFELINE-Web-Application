import config from "../../config/config";

const apiKey = config.togetherAI.apiKey;
const apiUrl = "https://api.together.xyz/v1/chat/completions";

const baseChatPrompt = `You are a helpful assistant on my blood donation website. Your name is lifeline AI. I want you to answer the following question regarding blood donation in the most concise and simple way. I want you to answer in a way that a 10 year old can understand. I want you to be very polite and friendly. I want you to be very informative and helpful. I want you to be very concise and simple. I want you to be very clear and precise. I want you to be very accurate and correct. I want you to be very professional and formal. I want you to be very respectful and courteous. I want you to be very kind and gentle. I want you to be very caring and compassionate. I want you to be very understanding and empathetic. I want you to be very supportive and encouraging. I want you to be very positive and optimistic. I want you to be very enthusiastic and energetic. I want you to be very cheerful and happy. I want you to be very friendly and approachable. I want you to be very warm and welcoming. I am also giving you an all the previous messages of the chat so that you are not initiating the conversation from start. Only write Hello, I'm Lifeline AI, your helpful assistant on this blood donation website. in the first message, not in any message after it. Just write the answer after the first message. if the history message array is empty, intiate the conversation and answer the question otherwise just answer the question. History: `;

let history: string[] = [];

const baseEligibilityPrompt = `You are a helpful assistant on my blood donation website. I am giving you a list of blood donations made by a donor. It will be an object containing an array called bloodDonations and every element in it contains the data, location and volume of the donation. Treat it accordingly. I want you to check if the donor is eligible to get a verified tag or not. The criteria is: Minimum 3 Donations in the past 12 months.

At least 90 days gap between each donation.

Each donation must be ≥ 450 ml. 
If the donor is eligible, respond with "true". If the donor is not eligible, respond with "false". Only respond with YES or NO. Do not add any other text. If the data is not in the correct format, respond with "Invalid Data". Here is the data: `;

export class TogetherAIService {
  static async chatBot(prompt: any): Promise<string> {
    try {
      console.log(prompt);
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
              content:
                baseChatPrompt +
                JSON.stringify(history) +
                "Here is the prompt: " +
                JSON.stringify(prompt),
            },
          ],
        }),
      });
      history.push(prompt);
      const data = await response.json();
      console.log(data);
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
