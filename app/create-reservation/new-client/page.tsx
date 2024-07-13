import { auth } from "@/auth";
import ContentItem from "@/components/content/ContentItem";
import { Form } from "@/components/forms/Form";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { Content } from "@/components/ui/Content";

export const generateMetadata = async () => {
  try {
    const session = await auth();

    return {
      title: `Create Reservation | ${
        session?.user?.email
          ? `Logged in as ${session?.user?.email}`
          : `New Client Reservation`
      }`,
      description: `Create a new reservation for your pet`,
    };
  } catch (e) {
    return {
      title: `Create Reservation`,
      description: `Create a new reservation for your pet`,
    };
  }
};

const NewClientPage = () => {
  return (
    <Content>
      <ContentItem page="RESERVATIONS" section="MAIN" name="newClientWelcome" />
      <ReservationForm />
    </Content>
  );
};

export default NewClientPage;
