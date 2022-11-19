import React from "react";
import { Promos } from "../ui-kit/Promo/Promos";
import { TabContent } from "./styles";

const BoardingCats = (props) => {
  return (
    <TabContent>
      <h1>Cat Condos</h1>
      <p>
        We offer cat boarding services. Choose between a cat condo or the
        catery!
      </p>
      <Promos
        promos={[
          {
            size: "calc(70vw / 4)",
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585011486/gk-app/Screen_Shot_2020-03-23_at_8.57.07_PM.png",
          },
          {
            size: "calc(70vw / 4)",
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419329/gk-app/Gregor_chilling.jpg",
          },
          {
            size: "calc(70vw / 4)",
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419330/gk-app/Gregor_playing.jpg",
          },
          {
            size: "calc(70vw / 4)",
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419334/gk-app/Boo_in_CatTree.jpg",
          },
        ]}
      />
      {/* <BoardingRates catsOnly={true} /> */}
    </TabContent>
  );
};

BoardingCats.propTypes = {};

export default BoardingCats;
