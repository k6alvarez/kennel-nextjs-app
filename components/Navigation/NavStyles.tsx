import styled from "styled-components";

export const CrestLogo = styled.img`
  position: absolute;
  top: 20px;
  left: 22px;
  width: 72%;
  filter: grayscale(100%);

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    top: 35px;
    left: 42px;
  }
`;

export const LogoName = styled.h2`
  font-family: "Dancing_Script", sans-serif;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  font-weight: bold;

  flex: 1;
  text-align: center;
  padding-right: 20px;

  margin: 0;
  display: flex;
  justify-content: center;
  flex: 1;
  padding: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    font-size: ${({ theme }) => theme.fontSizes[6]};
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.textPrimary};

    &:hover {
      text-decoration: none !important;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding-right: 0;
    margin-left: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    justify-content: start;
  }
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
    animation:shieldCaption 3s 1 linear;
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
    animation:shieldBorder 3s 1 linear;
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
    font-size: 1.2rem;

    animation:shieldText 3s 1 linear;
}

.rect-box {
    position: absolute;
    left: 18px;
    top: 51px;
    z-index: 2222;
    width: 248px;
    height: 140px;
    animation:rectBox 1s 1 ease-in-out;
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
