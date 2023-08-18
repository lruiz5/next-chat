import {NextApiRequest, NextApiResponse} from "next";

export default async function createMessage(req: NextApiRequest, res: NextApiResponse) {
  let { messages } = req.body
  messages += "Please limit the response to 90 words or less."
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY
  const gptModel = process.env.NEXT_PUBLIC_OPENAI_MODEL || "gpt-3.5-turbo"
  const url = 'https://api.openai.com/v1/chat/completions';

  const controller = new AbortController();
  setTimeout(() => controller.abort(), 15000)

  const body = JSON.stringify({
    messages,
    model: gptModel,
    stream: false
  })

  try {
    const response = await fetch(url, {
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body
    })
    const data = await response.json()
    res.status(200).json({ data })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
