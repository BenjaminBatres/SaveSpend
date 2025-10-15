import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function safeCompletion(openai, params, retries = 3) {
  try {
    return await openai.chat.completions.create(params);
  } catch (error) {
    if (error.status === 429 && retries > 0) {
      console.warn("Rate limit hit, retrying in 2s...");
      await new Promise((res) => setTimeout(res, 2000));
      return safeCompletion(openai, params, retries - 1);
    }
    throw error;
  }
}

export async function POST(req) {
  try {
    const { message } = await req.json();

    const completion = await safeCompletion(openai, {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return Response.json({ error: "Failed to generate response" }, { status: 500 });
  }
}

