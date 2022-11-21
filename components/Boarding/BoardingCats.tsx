import React from "react";
import { Content } from "../ui-kit/Base";
import { Gallery } from "../ui-kit/Gallery";
import BoardingRates from "./BoardingRates";

const BoardingCats = () => {
  return (
    <Content>
      <h1>Cat Condos</h1>
      <p>
        We offer cat boarding services. Choose between a cat condo or the
        catery!
      </p>
      <BoardingRates catsOnly />
      <Gallery
        images={[
          {
            src: "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585011486/gk-app/Screen_Shot_2020-03-23_at_8.57.07_PM.png",
          },
          {
            src: "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419329/gk-app/Gregor_chilling.jpg",
          },
          {
            src: "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419330/gk-app/Gregor_playing.jpg",
          },
          {
            src: "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419334/gk-app/Boo_in_CatTree.jpg",
          },
          {
            src: "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419338/gk-app/cattery_fluffy_cat.jpg",
          },
        ]}
      />
    </Content>
  );
};

BoardingCats.propTypes = {};

export default BoardingCats;
