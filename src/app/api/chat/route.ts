
import {
  type UIMessage,
  streamText,
  convertToModelMessages,
} from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("messages" in body) ||
      !Array.isArray(body.messages)
    ) {
      return Response.json(
        { error: "Request must contain a messages array" },
        { status: 400 }
      );
    }

    const messages = body.messages as UIMessage[];

const result = streamText({
  model: google("gemini-2.5-flash"),

  system: `You are a helpful React coding assistant.

Example question: How to toggle a boolean?

Example answer:
const [isOpen, setIsOpen] = useState(false);

const toggleOpen = () => {
  setIsOpen(prevState => !prevState);
};

Use this style when answering similar questions.`,

  messages: await convertToModelMessages(messages),
}); 

    result.usage.then((usage) => {
      console.log({
        messageCount: messages.length,
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
      });
    });

    return result.toUIMessageStreamResponse();

  } catch (error) {
    console.error("Error streaming text:", error);

    return Response.json(
      { error: "Failed to stream text" },
      { status: 500 }
    );
  }
}
