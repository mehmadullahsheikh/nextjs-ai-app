"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";

export default function ChatPage() {

    const [input,setInput] = useState("");
    const {messages,sendMessage,status,error,stop} = useChat({  
    }); 

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const trimmedInput = input.trim();

  if (!trimmedInput || status !== "ready") return;

  sendMessage({ text: trimmedInput });
  setInput("");
};


  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        {
            error && (
                <div className="p-4 mb-4 bg-red-800 border border-red-700 rounded-md">
                    <p className="text-white">{error.message}</p>
                </div>
            )
        }
      {messages.map((message) => (
        <div key={message.id} className="mb-4">
          <div className="font-semibold">
            {message.role === "user" ? "You: " : "AI: "}
            {message.parts.map((part, index) => {
              switch (part.type) {
                case "text":    
                  return <div  key={`${message.id}-${index}`}
                  className="whitespace-pre-wrap"
                  >{part.text}</div>;
                default:
                  return null;
              }
            })}
          </div>
        </div>
      ))}

      {
       ( status ==="submitted" || status ==="streaming" ) && (
            <div className="mb-4">
                <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        )
      }

      <form
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-900 border-t border-gray-900"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-2">
          <input
            className="bg-zinc-800 text-white placeholder:text-zinc-500 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
            placeholder="How can I help you today?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {
            status=="submitted" || status=="streaming" ?
            <button onClick={stop} type="button"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >       
            Stop
            </button> : 
             <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="submit"
            disabled={status!=="ready"}

          >
            Send
          </button>
          }
        </div>
      </form>
    </div>
  );
}