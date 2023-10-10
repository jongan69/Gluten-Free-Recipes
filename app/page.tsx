'use client'

import Link from "next/link"
import { useState } from 'react'
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import Thing from "@/components/three/thing"
import { Canvas } from '@react-three/fiber'
import ReactMarkdown from 'react-markdown'

export default function IndexPage() {
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [apiError, setApiError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const getRecipe = async () => { 
    setIsGenerating(true)
    try {
      const res = await fetch("/api/generate");
      setIsGenerating(false);
      const data = await res.json();
      alert("Recipe Generated!")
      setRecipe(data.recipe);
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
        <Canvas>
        <Thing />
        </Canvas>
        </div>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          AI Generated Gluten Free Recipes
        </p>
      </div>
    
      {!isGenerating && recipe && 
      <>
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Recipe:
      </h1>
      <ReactMarkdown>
        {recipe}
      </ReactMarkdown>
      </>}

      <div className="flex gap-4">
        <button
          onClick={() => getRecipe()}
          className={buttonVariants()}>
          Generate
        </button>
      </div>
    </section>
  )
}
