
const generateRecipe = async ({
  ingredients
}) => {
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
          prompt: ingredients ? `Generate a Gluten Free Recipe using the following ingredients: ${ingredients}` : `Generate a Gluten Free Recipe`,
          max_tokens: 300,
          temperature: 0.7,
        }),
      }
    );
    const data = await response.json();
    console.log('AI Response: ', data);

    if (!data?.error) {
      return data?.choices[0]?.text;
    } else {
      return data.error.message;
    }


  } catch (err) {
    console.error(err);
    return err.toString()
  }
};

export default async function handler(req, res) {
  const {
    ingredients
  } = req.body;

  console.log('Recipe Parms: ', ingredients)
  const answer = await generateRecipe({
    ingredients
  });

  res.status(200).json({
    answer,
  });
}