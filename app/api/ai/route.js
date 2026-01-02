import userModel from "@/modules/user";
import { logDisallowedDynamicError } from "next/dist/server/app-render/dynamic-rendering";
import OpenAI from "openai"; // <- ADD THIS
import signup from "@/modules/signup";
import { getUser } from "@/lib/getUser";
// import { mongodb } from "@/lib/mongodb";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  await connectDB();
  const auth = await getUser();

  const allChat = await signup.findOne({ email: auth.user.email });
  return Response.json({
    alreadyPaid: allChat.hasPaid === true,
  });
}

export async function POST(req) {
  await connectDB();
  const { education, section, aboutYourself, skills, content } =
    await req.json();
  const auth = await getUser();
  const Alluser = await signup.findOne({ email: auth.user.email });
  let improvedText = "";

  // console.log(user);

  // ********* this is original AI part *********

  const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });

  if (section === "education") {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are a professional resume writer.

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
          content: content,
        },
      ],
    });
    improvedText = completion.choices[0].message.content;
  }

  if (section === "aboutYourself") {
    const completionAbout = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
    You are a professional resume writer.
    Improve the ABOUT / SUMMARY section of a resume.
    Make it concise and professional.
    Fix grammar and clarity.
    Do NOT add fake experience or skills.
    Return ONLY the improved text.
            `,
        },
        {
          role: "user",
          content: content,
        },
      ],
    });
    improvedText = completionAbout.choices[0].message.content;
  }

  if (section == "skills") {
    let plainText = skills;

    const completionAbout = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
          You are a professional resume writer.
          Improve the SKILLS section of a resume.
          Make the skills clear, concise, and professional.
          Group related skills if appropriate.
          Use standard industry terms.
          Do NOT add skills that are not mentioned.
          Do NOT exaggerate proficiency.
          Return ONLY the improved skills text.
          `,
        },
        {
          role: "user",
          content: content,
        },
      ],
    });
    const plain = completionAbout.choices[0].message.content;
    // console.log("your skills Ai output", plain);

    let array = plain.split(",");
    // console.log(array);
    improvedText = array;

    // improvedText = skills;
  }

  if (Alluser.freeMessagesUsed == 3 && Alluser.hasPaid == false) {
    return Response.json(
      { block: true, message: "reached limited" },
      { status: 403 }
    );
  }

  // if (Alluser.hasPaid == true) {
  //   return Response.json(
  //     { block: true, message: 'hello' },
  //     { status:z` 201 }
  //   );
  // }

  if (Alluser.hasPaid == false) {
    Alluser.freeMessagesUsed++;
    await Alluser.save();
  }

  console.log("i am all user updatedddd", improvedText);

  return Response.json({ success: true, user: improvedText }, { status: 201 });
}
