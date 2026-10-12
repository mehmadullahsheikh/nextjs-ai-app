"use client"

import {useCompletion} from "@ai-sdk/react";

export default function StreamPage() {

    const {input , handleInputChange,handleSubmit,completion, isLoading, error,stop}= useCompletion({
        api: "/api/stream",
    });

    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
               {
                error && (
                    <div className="p-4 mb-4 bg-red-800 border border-red-700 rounded-md">
                        <p className="text-white">{error.message}</p>
                    </div>
                )
               }
               {
                isLoading && (
                    <div className="p-4 mb-4 bg-zinc-800 border border-zinc-700 rounded-md">
                        <p className="text-white">Loading...</p>
                    </div>
                )
               }

                { completion && (
                    <div className="p-4 mb-4 bg-zinc-800 border border-zinc-700 rounded-md">
                        <p className="text-white">{completion}</p>
                    </div>
                )}
           
            <form onSubmit={handleSubmit} className=" fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-900 border-t border-gray-900">
                <div className="flex  gap-2">
                    <input
                        className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-900 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"   
                        placeholder="Ask me anything..."
                        value={input}
                        onChange={handleInputChange}
                    />
                    {
                        isLoading ? 
                        <button onClick={stop} type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >       
                        Stop
                        </button> : 
                        <button type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        disabled={isLoading}
                    >
                        Send
                    </button>
                    }
                    
                </div>
            </form>
        </div>  
                                                                                                 
    )
}