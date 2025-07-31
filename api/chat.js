export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful tech support assistant who helps users troubleshoot computer hardware and software issues. Be concise, step-by-step, and user-friendly."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.5
      })
    });

    const data = await apiRes.json();
    res.status(200).json({ reply: data.choices[0].message.content });

  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Failed to fetch from OpenAI" });
  }
}
