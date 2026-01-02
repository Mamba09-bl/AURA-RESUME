import userModel from "@/modules/signup";
import userChat from "@/modules/user";
import OpenAI from "openai"; // <- ADD THIS
import { getUser } from "@/lib/getUser";
import { connectDB } from "@/lib/mongodb";

export async function POST(req) {
  await connectDB();
  const { title, skills, education, aboutYourself, id } = await req.json();
  let educatioinImprove = "";
  let aboutYourselfImprove = "";
  let skillsImprove = "";

  const auth = await getUser();
  const user = await userChat.findById(id);
  // console.log(user);

  const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });
  // console.log(education);

  const completion = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
  You are a professional resume writer you have to make education according to this ${title}.

  Improve the EDUCATION section of a resume.
  Fix grammar, clarity, and sentence flow.
  Rephrase sentences naturally to sound professional.
  You MAY change sentence structure and wording.
  You MUST keep all information factual and accurate.
  Do NOT add or remove qualifications, institutions, or dates.
  Do NOT invent any new details.

  Each response should feel natural and slightly different in phrasing.
  Return ONLY the improved text.
  `,
      },
      {
        role: "user",
        content: education,
      },
    ],
  });
  educatioinImprove = completion.choices[0].message.content;

  const completionAbout = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
      You are a professional resume writer.

The target job role is: ${title}

Rewrite the ABOUT / SUMMARY section of the resume so it aligns with this role.

Rules:
- Make the summary professional, concise, and job-focused
- Emphasize relevant strengths for the target role
- Improve grammar, clarity, and sentence flow
- Rephrase naturally (do not copy original wording)
- Do NOT add fake experience, skills, tools, or achievements
- Do NOT exaggerate responsibilities
- Use only the information already present in the text

Return ONLY the improved summary text.
              `,
      },
      {
        role: "user",
        content: aboutYourself,
      },
    ],
  });
  aboutYourselfImprove = completionAbout.choices[0].message.content;

  const completionskill = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a professional resume writer.

Target job role: ${title}

Rewrite the SKILLS section to best match this role.

Rules:
- Reorder skills so the most relevant ones appear first
- Group skills logically
- You MAY de-emphasize less relevant skills
- Do NOT add new skills
- Do NOT remove existing skills
- Do NOT invent tools or technologies
- Use professional, ATS-friendly wording

Return ONLY the rewritten skills section.

          `,
      },
      {
        role: "user",
        content: skills,
      },
    ],
  });
  skillsImprove = completionskill.choices[0].message.content;

  const update = await userChat.findByIdAndUpdate(
    id,
    {
      skills: skillsImprove,
      education: educatioinImprove,
      aboutYourself: aboutYourselfImprove,
    },
    { new: true }
  );

  console.log(update);

  return Response.json({ success: true, update }, { status: 201 });
}
