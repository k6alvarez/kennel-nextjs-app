import { auth } from "@/auth";
import ContentItem from "@/components/content/ContentItem";
import { Content } from "@/components/ui/Content";
import ContactForm from "@/components/forms/ContactForm";

export const generateMetadata = async () => {
  try {
    const session = await auth();
    return {
      title: `Contact`,
      description: `Welcome to the contact page`,
    };
  } catch (e) {
    return {
      title: `Contact`,
      description: `Welcome to the contact page`,
    };
  }
};

export default async function ContactPage() {
  const session = await auth();
  const userEmail = session?.user?.email;
  return (
    <Content>
      <ContentItem page="CONTACT" section="MAIN" name="contactContent" />
      <ContactForm email={userEmail} />
    </Content>
  );
}
