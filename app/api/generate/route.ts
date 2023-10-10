export async function GET(request: Request) {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          prompt: `Generate a Gluten Free Recipe`,
          max_tokens: 300,
          temperature: 0.7,
        }),
      }
    );
    const data = await response.json();
    console.log('AI Response: ', data);

    if (!data?.error) {
       return new Response(data?.choices[0]?.text, { status: 200 })
    } else {
      return data.error.message;
    }
  } catch (err) {
    console.error(err);
    return err.toString()
  }
};