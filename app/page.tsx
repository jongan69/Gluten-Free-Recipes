'use client'

import Link from "next/link"
import { useState } from 'react'
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import Thing from "@/components/three/thing"
import { Canvas } from '@react-three/fiber'

export default function IndexPage() {
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [apiError, setApiError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const getRecipe = async () => { 
    try {
      const res = await fetch("/api/generateRecipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: ingredients ? JSON.stringify({
          ingredients
        }) : null,
      });
      setIsGenerating(false);
      const data = await res.json();
      setRecipe(data.answer);
    } catch (err) {
      setApiError(err)
      console.error(err);
      setIsGenerating(false);
    }
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 sm:py-20">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
      <div className="flex flex-row align-left">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            GF Recipes <br className="hidden sm:inline" />
          w/ Nextjs
        </h1>
        <Canvas className="mb-10 h-50 w-50">
        <Thing />
        </Canvas>
        </div>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          AI Generated Gluten Free Recipes
        </p>
      </div>
      {recipe && 
          <div className="flex flex-col">
          <label htmlFor="output" className="sr-only">
          Recipe:
          </label>
          <textarea
            rows={
              summary === ""
                ? 7
                : 100
            }
            name="output"
            value={summary}
            onChange={!apiError ? (e) => setSummary(e.target.value) : (e) => setMarkdown(apiError)}
            disabled={summary === ""}
            id="output"
            placeholder="AI Response"
            className={`block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500
            ${!apiError
                ? "text-gray-900"
                : "text-red-500"
              }`}
          />
          <button
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            disabled={summary === ""}
          >
            {isCopied ? "Copied" : "Copy to Clipboard"}
          </button>
        </div>
      }
      <div className="flex gap-4">
        <button
          onClick={() => getRecipe()}
          className={buttonVariants()}>
          Signup
        </button>
      </div>
    </section>
  )
}
