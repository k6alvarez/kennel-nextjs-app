import React from "react";
import PropTypes from "prop-types";
import { Content } from "../ui-kit/Base";

const BoardingCats = (props) => {
  return (
    <Content>
      <h1>Cat Condos</h1>
      <p>
        We offer cat boarding services. Choose between a cat condo or the
        catery!
      </p>
      {/* <CenterImage url="https://res.cloudinary.com/dhcv2fdfq/image/upload/c_scale,h_500/v1585011486/gk-app/Screen_Shot_2020-03-23_at_8.57.07_PM.png" /> */}
      {/* <BoardingRates catsOnly={true} /> */}
    </Content>
  );
};

BoardingCats.propTypes = {};

export default BoardingCats;
