import axios from 'axios';
import config from '../../config/config';

const apiKey = config.togetherAI.apiKey;
const apiUrl = 'https://api.together.xyz/v1/chat/completions';

export async function fetchData(prompt: string): Promise<string> {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
                messages: [{ role: 'user', content: prompt }],
            }),
        });
        const data = await response.json();
        return data.choices[0].message.content;
        
    } catch (error) {
        console.error('Error:', error);
        return 'Error occurred';
    }
}

