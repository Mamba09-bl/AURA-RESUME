export async function POST(req) {
  try {
    const { content } = await req.json();

    if (!content || !content.trim()) {
      return new Response(
        JSON.stringify({ message: "Please provide some text to humanize." }),
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://router.huggingface.co/spaces/Bloody259/humanizer-ai",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`, // your HF token from .env.local
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: content }),
      }
    );

    // Parse the output
    const data = await response.json();

    // Try to get the humanized text (depends on how the Space returns it)
    const result =
      data?.[0]?.generated_text || data?.generated_text || JSON.stringify(data);
    console.log("i am human code", result);

    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error calling Humanizer API:", error);
    return new Response(
      JSON.stringify({
        message:
          error.message || "Failed to reach the Hugging Face Humanizer API.",
      }),
      { status: 500 }
    );
  }
}
