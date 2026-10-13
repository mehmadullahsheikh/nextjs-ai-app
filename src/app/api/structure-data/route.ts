
import { streamObject } from "ai";
import { google } from "@ai-sdk/google";
import { recipeSchema } from "./schema";

export async function POST(req: Request) {
    try {
        const { dist } = await req.json();

        if (typeof dist !== "string" || !dist.trim()) {
            return Response.json(
                { error: "Please provide a valid dish name" },
                { status: 400 }
            );
        }

        const result = streamObject({
            model: google("gemini-2.5-flash"),
            schema: recipeSchema,
            prompt: `Generate a detailed recipe for ${dist.trim()}. Include the recipe name, ingredients with amounts, and step-by-step cooking instructions.`,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error("Error streaming object:", error);

        return Response.json(
            { error: "Failed to stream object" },
            { status: 500 }
        );
    }
}
