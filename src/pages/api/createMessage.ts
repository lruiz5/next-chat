import { NextApiRequest, NextApiResponse } from "next";

export default async function createMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { messages } = req.body;

  const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;
  const gptModel = process.env.NEXT_PUBLIC_OPENAI_MODEL || "gpt-4";
  const url = "https://api.openai.com/v1/chat/completions";

  const controller = new AbortController();
  setTimeout(() => controller.abort(), 15000);

  messages[messages.length - 1].content =
    messages[messages.length - 1].content +
    " Please limit your response to 90 words or less.";
  const body = JSON.stringify({
    messages,
    model: gptModel,
    stream: false,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body,
    });
    const data = await response.json();
    res.status(200).json({ data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
