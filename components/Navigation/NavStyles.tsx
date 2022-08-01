import styled from "styled-components";

export const MobileToggle = styled.div`
  display: block;
  position: absolute;
  top: -15px;
  left: 1rem;
  color: #ffffff;

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: none;
  }
`;

export const MobileBook = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  right: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  width: 100%;
  backface-visibility: hidden;

  button {
    width: 100%;
    max-width: 100%;
    font-size: 1.2rem;
    border: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    margin: 0;
    border: 0;

    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.colors.primary} !important;
      color: ${({ theme }) => theme.colors.textPrimary} !important;
      border: 0;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: none;
  }
`;

export const SpacerElement = styled.div`
  display: flex;
`;

export const HeaderIcons = styled.div`
  display: flex;
  margin: 0 1rem;
  justify-content: center;
  font-size: 1rem;
  text-transform: uppercase;

  svg {
    margin-right: 0.5rem;
  }
`;

export const HeaderLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

export const TopHeader = styled.div`
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  flex: 1;
  background-color: #d9e5e8;

  padding: 0.5rem;
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: grid;
  }

  .ant-dropdown-link {
    font-size: 1rem;
    text-transform: uppercase;
  }

  .fakeButton {
    width: auto;
    border: none;
    color: ${({ theme }) => theme.colors.primary};
    background: none;

    cursor: pointer;
    transition: all 0.15s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      background: none;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;

      &:hover {
        color: ${({ theme }) => theme.colors.primary};
        background: none;
      }
    }
  }

  a:focus {
    font-weight: bold;

    text-decoration: none;
  }

  .active {
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;
export const BottomHeader = styled.div`
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  padding: 0.5rem;
  display: none;
  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: grid;
  }

  &&& a {
    color: #ffffff;
  }

  a:focus {
    font-weight: bold;

    text-decoration: none;
  }

  .active {
    border-bottom: 2px solid ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const BookButton = styled.button`
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.textPrimary};
  transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
  max-width: 260px;
  white-space: nowrap;
  font-size: 1rem;

  &:before {
    content: "Book Boarding Reservation";
  }

  @media (min-width: ${({ theme }) => theme.mobileNavBreakMedium}) {
    &:before {
      content: "Book Reservation";
    }
    font-size: initial;
  }

  @media (min-width: ${({ theme }) => theme.lgDesktopBreak}) {
    &:before {
      content: "Book Boarding Reservation";
    }
  }
`;

export const LogoText = styled.div`
  display: flex;
  margin: 0;
  position: relative;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  justify-content: center;

  h1 {
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

export const FlexContainerHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  flex: 1;

  > img {
    margin: 0 auto;
  }

  > button {
    margin: auto 0;
  }
`;

export const MainText = styled.h1`
  margin: 0;
  font-size: inherit;
  text-align: center;
  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    font-size: 1.5rem;
  }
`;

export const SubText = styled.p`
  margin: 0;
  font-size: 0.8rem;
  text-align: center;
  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    font-size: 1.66rem;
  }
`;

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  background: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.bs};
  color: ${({ theme }) => theme.colors.textPrimary};
  z-index: 1002;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 70px;

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    background: ${({ theme }) => theme.colors.primary};
    height: initial;
  }

  .bar {
    border-bottom: 2px solid ${({ theme }) => theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${({ theme }) => theme.lightgrey};
  }
`;

export const CrestLogo = styled.img`
  height: 240px;
  cursor: pointer;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Close = styled.div`
  font-size: 24px;
  cursor: pointer;
  font-weight: bold;
  height: 25px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    height: 55px;
  }
`;

export const Banner = styled.div`
  background-image: url("/static/images/gk_banner.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  padding: 3rem;
  width: fit-content;
  min-width: 260px;
  text-align: center;
  color: ${({ theme }) => theme.black};

  > * {
    margin: 0;
  }
`;

export const LogoGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: relative;
  margin-top: 0;
  position: absolute;
  top: -45%;
  left: 10%;
  transform: translate(-30%, -45%);
  color: ${({ theme }) => theme.colors.primary};
  height: 35px; */

  /* @media (min-width: 450px) {
    top: -45%;
    left: 20%;
    transform: translate(-30%, -45%);
  }

  @media (min-width: 550px) {
    top: -45%;
    left: 27%;
    transform: translate(-30%, -45%);
  }

  @media (min-width: 650px) {
    top: -45%;
    left: 20%;
    transform: translate(-10%, -45%);
  }

  @media (min-width: 750px) {
    top: -45%;
    left: 22%;
    transform: translate(0%, -45%);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    top: 0%;
    left: 50%;
    transform: translate(-50%, 8%);
    height: 100px;
  } */
`;

export const LogoName = styled.h2`
  /* position: absolute;
  top: -2px; */
  /* font-size: 2rem; */
  /* left: 120px;
  text-align: center;
  width: 100%;
  line-height: 1.2;
  z-index: 2;
  letter-spacing: 1px; */
  font-family: "Dancing_Script", sans-serif;
  font-weight: bold;

  /* .space {
    display: none;
  } */

  a {
    &:focus,
    &.active {
      text-decoration: none;
    }
  }

  /* @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    font-size: 3rem;
    top: 0;
    left: -30px;
    .space {
      display: inline;
    }

    a {
      color: ${({ theme }) => theme.colors.primary};
    }
  } */
`;
export const LogoDesc = styled.div`
  position: absolute;
  width: max-content;

  bottom: 3%;
  left: 50%;
  transform: translate(-50%, 3%);
  text-align: center;
`;
export const BadgeStyles = `
.shield {
    margin: 0 auto;
    position: relative;
    width: 280px;
    height: 280px;
    transform: scale(0.18);
    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      transform: scale(0.28);
    }
}

.shield-off, .shield-light {
    position: absolute;
    background: #8c0b3e;
    width: 280px;
    height: 300px;
    border-radius: 0 0 104% 104% / 0 310px 310px;
}


 .shield-light {
    background: #fff;
    border-top: solid 1px #fff;
    z-index: 2;
    -webkit-transform:scale(0.9);
        -moz-transform:scale(0.9);
        -ms-transform:scale(0.9);
        -o-transform:scale(0.9);
        transform:scale(0.9);
 }

 .shield-light:before {
    border-top-color: #fff;
    z-index: 2;
 }

 .shield-off:after, .shield-light:after {
    content: "";
    display: block;
    width: 0;
    position: absolute;
    top: -59px;
    height: 0;
    border: solid 60px transparent;
    border-bottom-color: #8c0b3e;
    border-top-width: 0px;
    border-left-width: 140px;
    border-right-width: 140px;

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      top: -59px;
    }

}

.shield-light:after {
    border-bottom-color: #fff;
}

.circles {
    width: 179px;
    height: 46px;
    background: transparent;
    z-index: 2;
    position: absolute;
    border-radius: 50% / 42%;
    top: -68px;
    left: -17px;
    transform: rotate(-27deg);

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      background: #d9e5e8;
    }
}

.shield .circles:nth-child(2){
    -webkit-transform: scale(0.9) rotate(25deg);
    -moz-transform: scale(0.9) rotate(25deg);
    -ms-transform: scale(0.9) rotate(25deg);
    -o-transform: scale(0.9) rotate(25deg);
    transform: scale(0.9) rotate(25deg);
    left: 120px;
    top: -65px;
}

.shield-off .circles {
    z-index: 22222222;
}


.shield-light .circles {

    background: transparent;

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      background: #8c0b3e;
    }
}

.shield-caption {
    width: 310px;
    height: 58px;
    background: #8c0b3e;
    position: absolute;
    z-index: 3;
    text-align: center;
    line-height: 60px;
    color: #fff;
    left: -15px;
    bottom: 30px;

    font-size: 40px;
    -webkit-animation:shieldCaption 5s 1 linear;
        -moz-animation:shieldCaption 5s 1 linear;
        -ms-animation:shieldCaption 5s 1 linear;
        -o-animation:shieldCaption 5s 1 linear;
        animation:shieldCaption 5s 1 linear;
}

.shield-caption:before,.shield-caption:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border: solid 19px transparent;
    border-bottom-color: #11181B;
    border-bottom-width: 0;
    border-bottom-width: 12px;
    top: -31px;
    -webkit-animation:shieldBorder 5s 1 linear;
        -moz-animation:shieldBorder 5s 1 linear;
        -ms-animation:shieldBorder 5s 1 linear;
        -o-animation:shieldBorder 5s 1 linear;
        animation:shieldBorder 5s 1 linear;
}

.shield-caption:before {
    left: 0px;
    border-right-width: 1px;
}

.shield-caption:after {
    right: 0px;
    border-left-width: 1px;
}

.shield-caption p {
    color: #fff;
    font-size: 1.5rem;

    animation:shieldText 5s 1 linear;
}

.rect-box {
    position: absolute;
    left: 18px;
    top: 52px;
    z-index: 2222;
    width: 248px;
    height: 140px;
    animation:rectBox 5s 1 linear;
    transform-origin: 50% 50%;
}

.rect-box:before {
    display:none;
    content: "";
    width: 32px;
    height: 30px;
    background: #FFF;
    z-index: 10;
    position: absolute;
    top: 55px;
    left: 106px;
    -webkit-transform: rotateZ(-44deg);
        -moz-transform: rotateZ(-44deg);
        -ms-transform: rotateZ(-44deg);
        -o-transform: rotateZ(-44deg);
        transform: rotateZ(-44deg);
        s
}

.rect {
    height: 34px;
    width: 98px;
    background: #10ACC5;
    border-radius: 4px;
    top: 30px;
    position: absolute;
    left: 50px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.72);
    -webkit-transform: rotateZ(-44deg);
    -moz-transform: rotateZ(-44deg);
    -ms-transform: rotateZ(-44deg);
    -o-transform: rotateZ(-44deg);
    transform: rotateZ(-44deg);
}

.rect:first-child {
    z-index: 2;
}

.rect:nth-child(2){
    -webkit-transform: rotateZ(-136deg);
        -moz-transform: rotateZ(-136deg);
        -ms-transform: rotateZ(-136deg);
        -o-transform: rotateZ(-136deg);
        transform: rotateZ(-136deg);
    box-shadow: none;
    top: 76px;
    left: 50px;
    z-index: 3;
}

.rect:nth-child(3){
    box-shadow: none;
    top: 76px;
    background: #007086;
    left: 96px;
    z-index: 4;
}

.rect:nth-child(4){
    -webkit-transform: rotateZ(-136deg);
        -moz-transform: rotateZ(-136deg);
        -ms-transform: rotateZ(-136deg);
        -o-transform: rotateZ(-136deg);
        transform: rotateZ(-136deg);
    box-shadow: none;
    background: #007086;
    top: 30px;
    left: 97px;
    z-index: 1;
}

.risc {
    width: 84px;
    height: 1px;
    background: #31B7CD;
    position: absolute;
    left: 50%;
    top: -3px;
    z-index: 2222;
    margin-left: -42px;
    opacity: 1;
}

.risc:before {
    content: "";
    width: 1px;
    height: 1px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: -1.8px;
    margin-left: -2px;
    background: #fff;
    border: solid 2px #31B7CD;
    -webkit-animation:moveRiscCircle 1s infinite alternate linear;
        -moz-animation:moveRiscCircle 1s infinite alternate linear;
        -ms-animation:moveRiscCircle 1s infinite alternate linear;
        -o-animation:moveRiscCircle 1s infinite alternate linear;
        animation:moveRiscCircle 1s infinite alternate linear;
}

.risc:first-child {
    -webkit-animation:risc-1 5s 1 linear;
        -moz-animation:risc-1 5s 1 linear;
        -ms-animation:risc-1 5s 1 linear;
        -o-animation:risc-1 5s 1 linear;
        animation:risc-1 5s 1 linear;
}

.risc:nth-child(2){
    -webkit-animation:risc-2 5s 1 linear;
        -moz-animation:risc-2 5s 1 linear;
        -ms-animation:risc-2 5s 1 linear;
        -o-animation:risc-2 5s 1 linear;
        animation:risc-2 5s 1 linear;

    -webkit-transform: rotateZ(-90deg);
        -moz-transform: rotateZ(-90deg);
        -ms-transform: rotateZ(-90deg);
        -o-transform: rotateZ(-90deg);
        transform: rotateZ(-90deg);

    top: 81px;
    left: 52px;
}

.risc:nth-child(3){
    -webkit-animation:risc-3 5s 1 linear;
        -moz-animation:risc-3 5s 1 linear;
        -ms-animation:risc-3 5s 1 linear;
        -o-animation:risc-3 5s 1 linear;
        animation:risc-3 5s 1 linear;

    -webkit-transform: rotateZ(90deg);
        -moz-transform: rotateZ(90deg);
        -ms-transform: rotateZ(90deg);
        -o-transform: rotateZ(90deg);
        transform: rotateZ(90deg);

    top: 81px;
    right: 50px;
    margin-left: 0;
    margin-right: -39px;
    left: inherit;
}

.risc:nth-child(4){
    top: 100%;
    margin-top: -40px;
    -webkit-animation:risc-4 5s 1 linear;
        -moz-animation:risc-4 5s 1 linear;
        -ms-animation:risc-4 5s 1 linear;
        -o-animation:risc-4 5s 1 linear;
        animation:risc-4 5s 1 linear;

    -webkit-transform:rotateZ(180deg);
        -moz-transform:rotateZ(180deg);
        -ms-transform:rotateZ(180deg);
        -o-transform:rotateZ(180deg);
        transform:rotateZ(180deg);
}

@-webkit-keyframes rectBox {
    0%{
        top: -118px;
        opacity: 0;
    }10%{
        top: 12px;
        opacity: 1;
        -webkit-transform:rotateZ(0);
    }
}

@-moz-keyframes rectBox {
    0%{
        top: -118px;
        opacity: 0;
    }10%{
        top: 12px;
        opacity: 1;
        -moz-transform:rotateZ(0);
    }
}

@-ms-keyframes rectBox {
    0%{
        top: -118px;
        opacity: 0;
    }10%{
        top: 12px;
        opacity: 1;
        -ms-transform:rotateZ(0);
    }
}

@-o-keyframes rectBox {
    0%{
        top: -118px;
        opacity: 0;
    }10%{
        top: 12px;
        opacity: 1;
        -o-transform:rotateZ(0);
    }
}

@keyframes rectBox {
    0%{
        top: -118px;
        opacity: 0;
    }10%{
        top: 12px;
        opacity: 1;
        transform:rotateZ(0);
    }
}

@-webkit-keyframes shieldCaption {
    0%, 27%{
        width: 0;
    }34% {
        width: 310px;
    }
}

@-moz-keyframes shieldCaption {
    0%, 27%{
        width: 0;
    }34% {
        width: 310px;
    }
}

@-ms-keyframes shieldCaption {
    0%, 27%{
        width: 0;
    }34% {
        width: 310px;
    }
}

@-o-keyframes shieldCaption {
    0%, 27%{
        width: 0;
    }34% {
        width: 310px;
    }
}

@keyframes shieldCaption {
    0%, 27%{
        width: 0;
    }34% {
        width: 310px;
    }
}

@-webkit-keyframes shieldBorder {
    0%, 30%{
        border-bottom-width: 0;
        top: -19px;
    }34% {
        border-bottom-width: 12px;
        top: -31px;
    }
}

@-moz-keyframes shieldBorder {
    0%, 30%{
        border-bottom-width: 0;
        top: -19px;
    }34% {
        border-bottom-width: 12px;
        top: -31px;
    }
}

@-ms-keyframes shieldBorder {
    0%, 30%{
        border-bottom-width: 0;
        top: -19px;
    }34% {
        border-bottom-width: 12px;
        top: -31px;
    }
}

@-o-keyframes shieldBorder {
    0%, 30%{
        border-bottom-width: 0;
        top: -19px;
    }34% {
        border-bottom-width: 12px;
        top: -31px;
    }
}

@keyframes shieldBorder {
    0%, 30%{
        border-bottom-width: 0;
        top: -19px;
    }34% {
        border-bottom-width: 12px;
        top: -31px;
    }
}

@-webkit-keyframes shieldText {
    0%, 32%{
        text-shadow:0 0 120px #fff;
        color: transparent;
    }40% {
        text-shadow:0 0 1px #fff;
        color: transparent;
    }

    43%{
        text-shadow:0 0 0 #fff;
        color: #fff;
    }
}

@-moz-keyframes shieldText {
    0%, 32%{
        text-shadow:0 0 120px #fff;
        color: transparent;
    }40% {
        text-shadow:0 0 1px #fff;
        color: transparent;
    }

    43%{
        text-shadow:0 0 0 #fff;
        color: #fff;
    }
}

@-ms-keyframes shieldText {
    0%, 32%{
        text-shadow:0 0 120px #fff;
        color: transparent;
    }40% {
        text-shadow:0 0 1px #fff;
        color: transparent;
    }

    43%{
        text-shadow:0 0 0 #fff;
        color: #fff;
    }
}


@-o-keyframes shieldText {
    0%, 32%{
        text-shadow:0 0 120px #fff;
        color: transparent;
    }40% {
        text-shadow:0 0 1px #fff;
        color: transparent;
    }

    43%{
        text-shadow:0 0 0 #fff;
        color: #fff;
    }
}



@keyframes shieldText {
    0%, 32%{
        text-shadow:0 0 120px #fff;
        color: transparent;
    }40% {
        text-shadow:0 0 1px #fff;
        color: transparent;
    }

    43%{
        text-shadow:0 0 0 #fff;
        color: #fff;
    }
}

@-webkit-keyframes risc-1 {
    0%, 43%{
        opacity: 0;
        -webkit-transform:translateX(-20px);
    }

    47% {
        opacity: 1;
        -webkit-transform:translateX(0px);
    }
}


@-moz-keyframes risc-1 {
    0%, 43%{
        opacity: 0;
        -moz-transform:translateX(-20px);
    }

    47% {
        opacity: 1;
        -moz-transform:translateX(0px);
    }
}


@-ms-keyframes risc-1 {
    0%, 43%{
        opacity: 0;
        -ms-transform:translateX(-20px);
    }

    47% {
        opacity: 1;
        -ms-transform:translateX(0px);
    }
}


@-o-keyframes risc-1 {
    0%, 43%{
        opacity: 0;
        -o-transform:translateX(-20px);
    }

    47% {
        opacity: 1;
        -o-transform:translateX(0px);
    }
}


@keyframes risc-1 {
    0%, 43%{
        opacity: 0;
        transform:translateX(-20px);
    }

    47% {
        opacity: 1;
        transform:translateX(0px);
    }
}


@-webkit-keyframes risc-2 {
    0%, 43%{
        opacity: 0;
        -webkit-transform:translateY(20px) rotateZ(-90deg);
    }

    47% {
        opacity: 1;
        -webkit-transform:translateY(0px) rotateZ(-90deg);
    }
}


@-moz-keyframes risc-2 {
    0%, 43%{
        opacity: 0;
        -moz-transform:translateY(20px) rotateZ(-90deg);
    }

    47% {
        opacity: 1;
        -moz-transform:translateY(0px) rotateZ(-90deg);
    }
}


@-ms-keyframes risc-2 {
    0%, 43%{
        opacity: 0;
        -ms-transform:translateY(20px) rotateZ(-90deg);
    }

    47% {
        opacity: 1;
        -ms-transform:translateY(0px) rotateZ(-90deg);
    }
}


@-o-keyframes risc-2 {
    0%, 43%{
        opacity: 0;
        -o-transform:translateY(20px) rotateZ(-90deg);
    }

    47% {
        opacity: 1;
        -o-transform:translateY(0px) rotateZ(-90deg);
    }
}


@keyframes risc-2 {
    0%, 43%{
        opacity: 0;
        transform:translateY(20px) rotateZ(-90deg);
    }

    47% {
        opacity: 1;
        transform:translateY(0px) rotateZ(-90deg);
    }
}


@-webkit-keyframes risc-3 {
    0%, 43%{
        opacity: 0;
        -webkit-transform:translateY(-20px) rotateZ(90deg);
    }

    47% {
        opacity: 1;
        -webkit-transform:translateY(0px) rotateZ(90deg);
    }
}


@-moz-keyframes risc-3 {
    0%, 43%{
        opacity: 0;
        -moz-transform:translateY(-20px) rotateZ(90deg);
    }

    47% {
        opacity: 1;
        -moz-transform:translateY(0px) rotateZ(90deg);
    }
}


@-ms-keyframes risc-3 {
    0%, 43%{
        opacity: 0;
        -ms-transform:translateY(-20px) rotateZ(90deg);
    }

    47% {
        opacity: 1;
        -ms-transform:translateY(0px) rotateZ(90deg);
    }
}


@-o-keyframes risc-3 {
    0%, 43%{
        opacity: 0;
        -o-transform:translateY(-20px) rotateZ(90deg);
    }

    47% {
        opacity: 1;
        -o-transform:translateY(0px) rotateZ(90deg);
    }
}


@keyframes risc-3 {
    0%, 43%{
        opacity: 0;
        transform:translateY(-20px) rotateZ(90deg);
    }

    47% {
        opacity: 1;
        transform:translateY(0px) rotateZ(90deg);
    }
}


@-webkit-keyframes risc-4 {
    0%, 43%{
        opacity: 0;
        -webkit-transform:translateX(-20px) rotateZ(180deg);
    }

    47% {
        opacity: 1;
        -webkit-transform:translateX(0px) rotateZ(180deg);
    }
}


@-moz-keyframes risc-4 {
    0%, 43%{
        opacity: 0;
        -moz-transform:translateX(-20px) rotateZ(180deg);
    }

    47% {
        opacity: 1;
        -moz-transform:translateX(0px) rotateZ(180deg);
    }
}


@-ms-keyframes risc-4 {
    0%, 43%{
        opacity: 0;
        -ms-transform:translateX(-20px) rotateZ(180deg);
    }

    47% {
        opacity: 1;
        -ms-transform:translateX(0px) rotateZ(180deg);
    }
}


@-o-keyframes risc-4 {
    0%, 43%{
        opacity: 0;
        -o-transform:translateX(-20px) rotateZ(180deg);
    }

    47% {
        opacity: 1;
        -o-transform:translateX(0px) rotateZ(180deg);
    }
}


@keyframes risc-4 {
    0%, 43%{
        opacity: 0;
        transform:translateX(-20px) rotateZ(180deg);
    }

    47% {
        opacity: 1;
        transform:translateX(0px) rotateZ(180deg);
    }
}


@-webkit-keyframes moveRiscCircle {
    0%{
        -webkit-transform:translateX(-20px);
    }

    100% {
        -webkit-transform:translateX(20px);
    }
}


@-moz-keyframes moveRiscCircle {
    0%{
        -moz-transform:translateX(-20px);
    }

    100% {
        -moz-transform:translateX(20px);
    }
}


@-ms-keyframes moveRiscCircle {
    0%{
        -ms-transform:translateX(-20px);
    }

    100% {
        -ms-transform:translateX(20px);
    }
}


@-o-keyframes moveRiscCircle {
    0%{
        -o-transform:translateX(-20px);
    }

    100% {
        -o-transform:translateX(20px);
    }
}


@keyframes moveRiscCircle {
    0%{
        transform:translateX(-20px);
    }

    100% {
        transform:translateX(20px);
    }
}
`;
