
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { recipeSchema } from "@/app/api/structure-data/schema";

export default function StructureDataPage() {
    const [distName, setDistName] = useState("");

    const { submit, object, isLoading, error, stop } = useObject({
        api: "/api/structure-data",
        schema: recipeSchema,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dish = distName.trim();

        if (!dish || isLoading) return;

        submit({ dist: dish });
        setDistName("");
    };

    return (
        <div className="flex flex-col w-full max-w-2xl pt-12 pb-32 mx-auto">

            {/* Error Message */}
            {error && (
                <div className="text-red-500 mb-4 px-4">
                    {error.message}
                </div>
            )}

            {/* Recipe Output */}
            {object?.recipe && (
                <div className="space-y-6 px-4">

                    {/* Recipe Name */}
                    {object.recipe.name && (
                        <h2 className="text-2xl font-bold">
                            {object.recipe.name}
                        </h2>
                    )}

                   
{/* Ingredients */}
{object.recipe.ingredients && (
    <div>
        <h3 className="text-lg font-semibold mb-2">
            Ingredients
        </h3>

        <div className="grid grid-cols-2 gap-3">
            {object.recipe.ingredients.map((ingredient, index) => (
                <div
                    key={index}
                    className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-3 py-3"
                >
                    <p className="font-medium">
                        {ingredient?.name}
                    </p>

                    <p className="text-sm text-zinc-600 dark:text-zinc-300">
                        {ingredient?.amount}
                    </p>
                </div>
            ))}
        </div>
    </div>
)}


                    {/* Recipe Steps */}
                    {object.recipe.steps && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4">
                                Steps
                            </h3>

                            <ol className="space-y-4">
                                {object.recipe.steps.map(
                                    (step, index) => (
                                        <li
                                            key={index}
                                            className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg"
                                        >
                                            <span className="font-medium mr-2">
                                                {index + 1}.
                                            </span>

                                            {step}
                                        </li>
                                    )
                                )}
                            </ol>
                        </div>
                    )}
                </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
                <p className="text-center text-sm text-zinc-500 mt-4 px-4">
                    Generating your recipe...
                </p>
            )}

            {/* Input Form */}
            <form
                onSubmit={handleSubmit}
                className="fixed bottom-0 left-0 right-0 w-full max-w-2xl mx-auto p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800"
            >
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter a dish name"
                        className="flex-1 min-w-0 bg-white dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={distName}
                        onChange={(e) => setDistName(e.target.value)}
                        disabled={isLoading}
                    />

                    {isLoading ? (
                        <button
                            type="button"
                            onClick={stop}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                        >
                            Stop
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={!distName.trim()}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Generate
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
