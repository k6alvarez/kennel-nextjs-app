import React from "react";
import Layout from "../components/Layout";
import { Promo } from "../components/ui-kit/Promo";
import { Content } from "../components/ui-kit/Base";
import { Callouts } from "../components/ui-kit/Callouts";

const Blog: React.FC = () => {
  return (
    <Layout>
      <Promo
        promos={[
          {
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585006907/gk-app/gkplays.jpg",
            size: "24vw",
          },
          {
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585005807/gk-app/gkrun.jpg",
            size: "24vw",
          },
          {
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585005125/gk-app/gk_home_01.jpg",
            size: "24vw",
          },
        ]}
      />
      <Content>
        <h1>About Our Boarding Kennel</h1>
        <p>
          Inside we feature central air conditioning and in-floor radiant heat.
          It’s so cozy, some of our guests prefer sleeping next to their beds!
        </p>
        <p>
          The outside areas are designed to be bright and airy – never
          confining! Each run opens into one of our 4 large exercise yards where
          your dog can enjoy exercise time and playtime with staff, or even pool
          time in the summer! We are nested on 8 country acres, perfect for
          long, meandering walks…
        </p>
        <p>
          Don’t forget about that special cat in your life! Our cattery is
          located off the reception area in a sound-proof, sun filled room. For
          your cat’s pleasure we offer 5 tier kitty condos – no cages! The
          entire room, complete with rocking chairs, cozy baskets, and wide
          window sills, is available on a first come first serve basis.
        </p>
      </Content>
      <Callouts
        callouts={[
          {
            title: "We board cats!",
            description: "We have a cattery for your cat's stay.",
            link: "/boarding",
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585006782/gk-app/catsgk.jpg",
          },
          {
            title: "Before you board",
            link: "/boarding",
            description: "Learn more about our boarding services.",
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585006544/gk-app/gktwopups.jpg",
          },
          {
            title: "Vaccinations",
            description: "Read about our Vaccinations requirements.",
            link: "/boarding",
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1547342058/samples/animals/three-dogs.jpg",
          },
        ]}
      />
      <Content>
        <h2>Gillette Kennels is also proud to offer Obedience Training!</h2>
        <p>
          Kirk L. Gillette formally began professionally training dogs in
          January of 1992 when he developed and opened Gillette Obedience
          Training. The boarding kennel was added to the business in early 1998.
          Mr. Gillette’s qualifications are unsurpassed in the Kalamazoo,
          Portage, and Battle Creek area. In addition to holding a Master’s
          Degree in Behavioral Psychology from Western Michigan University, Mr.
          Gillette also obtained a diploma from West Virginia Canine College
          that certified him in professional dog training and kennel management.
          Our training courses range from puppy head start classes to basic,
          intermediate, and advanced levels!
        </p>
        <h3>Our Mission</h3>
        <p>
          This website was created with you, our clients, in mind. Our goal is
          to become the premier boarding kennel in Kalamazoo, Portage, and
          Battle Creek. While many site enhancements are presently in the works,
          we would love to learn your suggestions to improve the site so that we
          can better serve you. Please Contact Us with your suggestions.
        </p>
        <p>Thank you, Kirk L. Gillette, M.A.</p>
      </Content>
    </Layout>
  );
};

export default Blog;
