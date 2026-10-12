"use client";

import { useState } from "react";

export default function CompletionPage() {
    const [prompt, setPrompt] = useState(""); // user input will be stored here
    const [completion, setCompletion] = useState(""); // ai response will be stored here
    const [isLoading, setLoading] = useState(false); // loading state to indicate when the request is in progress
    const [error, setError] = useState<string | null> (null); // error state to handle any errors that may occur during the request

    const complete = async (e: React.FormEvent) => {
        e.preventDefault(); // prevent the default form submission behavior
        setLoading(true); // set loading state to true when the request starts
        setPrompt(""); // clear the input field after submission
        
        try {
            const response = await fetch("/api/completion",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ prompt }), // send the user input as JSON in the request body
            })

            const data = await response.json(); // parse the JSON response from the server
            if(!response.ok){
                throw new Error(data.error || "Something went wrong"); // throw an error if the response is not ok
            }
            setCompletion(data.text); // update the completion state with the AI response
        }
        catch (error) {
            console.error("Error fetching completion:", error); // log the error to the console for debugging
            setError(error instanceof Error ? error.message : "something went wrong. Please try again"); // set the error state with the error message
        }   
        finally {
            setLoading(false); // set loading state to false when the request is complete
        }
    };


    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">

            {error && <div className="p-4 bg-red-500 text-white rounded-md mb-4">{error}</div> // display error message if there is an error
            }
            {/* Display the completion will go here */
             isLoading ? 
                 <div>Loading...</div> : completion ? (
                 <div className="p-4 bg-zinc-800 rounded-md text-white">
                    {completion}
                </div>
                ) : null
            }

            <form onSubmit={complete} className=" fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-900 border-t border-gray-900">
                <div className="flex  gap-2">
                    <input
                     className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-900 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     placeholder="How can I help you?" 
                     value={prompt}
                     onChange={(e) => setPrompt(e.target.value)}
                     />
                    <button type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    disabled={isLoading}
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}             