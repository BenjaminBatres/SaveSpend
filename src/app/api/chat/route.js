import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.choices[0].message.content;
    return Response.json({ reply });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return Response.json({ reply: "Sorry, something went wrong." }, { status: 500 });
  }
}
