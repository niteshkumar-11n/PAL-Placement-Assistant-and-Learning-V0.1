import axios from "axios";

export class OpenRouterError extends Error {
    constructor(message, statusCode = 500, details = null) {
        super(message);
        this.name = "OpenRouterError";
        this.statusCode = statusCode;
        this.details = details;
    }
}

export const askAi = async (messages) => {
    try {
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new OpenRouterError("Messages array is empty.", 400);
        }

        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            throw new OpenRouterError("OpenRouter API key is missing. Please check your .env configuration.", 500);
        }

        const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model,
                messages,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:5173",
                    "X-Title": "InterviewIQ",
                },
                timeout: 60000,
            }
        );

        const content = response?.data?.choices?.[0]?.message?.content;

        if (!content || !content.trim()) {
            throw new OpenRouterError("AI returned an empty response.", 502);
        }

        return content;
    } catch (error) {
        if (error instanceof OpenRouterError) {
            throw error;
        }

        const status = error.response?.status;
        const errorData = error.response?.data?.error;
        const rawMessage = typeof errorData === "string" ? errorData : errorData?.message || error.message;

        console.error("OpenRouter API Error:", {
            status,
            data: error.response?.data || error.message,
        });

        if (status === 401) {
            throw new OpenRouterError(
                "Invalid OpenRouter API Key. Please check your API key in .env.",
                401,
                rawMessage
            );
        }

        if (status === 402) {
            throw new OpenRouterError(
                "Insufficient OpenRouter credits. Please add credits or select a free model.",
                402,
                rawMessage
            );
        }

        if (status === 429) {
            throw new OpenRouterError(
                "OpenRouter rate limit reached. Please wait a moment and try again.",
                429,
                rawMessage
            );
        }

        throw new OpenRouterError(
            rawMessage || "Failed to communicate with OpenRouter AI service.",
            status || 500,
            error.response?.data
        );
    }
};