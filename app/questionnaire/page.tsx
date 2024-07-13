import { auth } from "@/auth";
import PetQuestionnaire from "@/components/forms/PetQuestionnaire";
import { Content } from "@/components/ui/Content";

// export const generateMetadata = async () => {
//   try {
//     const session = await auth();
//     return {
//       title: `Rates`,
//       description: `Welcome to the rates page`,
//     };
//   } catch (e) {
//     return {
//       title: `Rates`,
//       description: `Welcome to the rates page`,
//     };
//   }
// };

export default async function QuestionnairePage() {
  const session = await auth();
  return (
    <Content>
      <h1>Gillette Kennels Pet Questionnaire</h1>
      <p>
        Please make sure you complete all required fields, as indicated by (*).
      </p>
      <blockquote>
        <p>
          Please answer all questions no matter how irrelevant they may seem. If
          a field is does not apply, please type "N/A" in the field.
        </p>
      </blockquote>
      <PetQuestionnaire user={session?.user as any} />
    </Content>
  );
}
