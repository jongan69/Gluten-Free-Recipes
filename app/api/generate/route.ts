export async function GET(request: Request, response: Response) {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Generate a new Gluten Free Recipe`,
          max_tokens: 300,
          temperature: 0.9,
        }),
      }
    );
    const data = await response.json();
    console.log('AI Response: ', data);
    const recipe =  data?.choices[0]?.text
    return Response?.json({ recipe }) 
  } catch (err) {
    console.error(err);
    return Response?.json({ err }) 
  }
};