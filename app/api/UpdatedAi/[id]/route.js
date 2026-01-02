import userModel from "@/modules/user";
import { Content } from "next/font/google";
import { connectDB } from "@/lib/mongodb";
// export async function POST(req, { params }) {
//   const { id } = await params;
//   console.log(id);
//   const user = await userModel.findById(id);
//   console.log(user);

//   const { edu, section, content } = await req.json();
//   console.log("before adding", edu);

//   // const updatedUser = await userModel.findByIdAndUpdate(
//   //   id,
//   //   { [section]: edu },
//   //   { new: true }
//   // );
//   // console.log("i am from backend", updatedUser);

//   const updatedUser = await userModel.findByIdAndUpdate(id, {
//     $push: {
//       [{section}.history]: {
//         text: user[section],
//         updatedAt: new Date(),
//         source: "user",
//       },
//     },
//     $set: {
//       [section]: edu,
//     },
//   });
//   console.log(updatedUser);

//   return Response.json({ success: true, updatedUser }, { status: 200 });
// }

export async function POST(req, { params }) {
  await connectDB();
  const { id } = await params;
  const { edu, section } = await req.json();

  const user = await userModel.findById(id);
  let originalText = user[section];
  if (Array.isArray(originalText)) {
    originalText = originalText.join(", ");
  }
  console.log("SECTION:", section);
  const history = await userModel.findByIdAndUpdate(
    id,
    {
      $push: {
        [`${section}History`]: {
          text: originalText, // ✅ original user content
          updatedAt: new Date(),
        },
      },
      $set: {
        [section]: edu, // ✅ AI text replaces current
      },
    },
    { new: true }
  );
  // console.log("i am the history", history);
  // console.log("PUSHING INTO:", `${section}History`);
  console.log("TEXT:", edu);

  const all = await userModel.findById(id);
  console.log("all means all", all);

  return Response.json({ success: true, all });
}
