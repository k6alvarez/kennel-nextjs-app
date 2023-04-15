import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { animated, config, useSpring } from "react-spring";
import { ThemePreferenceContext } from "../../pages/_app";
import { saveContent } from "../Admin/services";
import { EditForm } from "../Forms/styles";
import { Crest } from "../Navigation/LogoLinks";
import { Size, useWindowSize } from "./hooks/useWindowSize";
import { LogoOne } from "./Logo";
import { Promos } from "./Promo/Promos";
import {
  PromoWrapper,
  PromoText,
  PromoTitleWrapper,
  PromoFooter,
} from "./Promo/styles-promo";
import { Tiptap } from "./Tiptap";

export const CONTENT_ITEMS_INITIAL_STATE = {
  name: "homePagePromoTitle",
  content:
    "At Gillette Kennels, we are committed to providing the best care for your pet.",
};

export const defaultDelay = 200;

export const Promo = ({
  promos = [],
  setPromos = undefined,
  children = undefined,
  showFooter = false,
  animate = true,
  contentItem = null,
  setContentItem = undefined,
  sliderMode = false,
}) => {
  const { currentTheme, breakpoints, editMode } = useContext(
    ThemePreferenceContext
  );
  const [isLoading, setIsLoading] = useState(false);

  const props = useSpring({
    from: { opacity: animate ? 0 : 1 },
    to: { opacity: 1 },
    delay: animate ? defaultDelay : 0,
    config: config.slow,
  });
  const fadeInPt1 = useSpring({
    from: {
      opacity: animate ? 0 : 1,
    },
    to: {
      opacity: 1,
    },
    config: config.slow,
    delay: animate ? defaultDelay : 0,
    reset: true,
  });

  const size: Size = useWindowSize();
  const mobileScreen = size.width < parseInt(breakpoints[0]);

  const onSave = (html) => {
    setIsLoading(true);
    saveContent({
      apiPath: `/api/content-item/${contentItem.id}`,
      html,
    })
      .then(() => {
        setIsLoading(false);
        setContentItem({ content: html });
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <>
      <PromoWrapper currentTheme={currentTheme}>
        {editMode && contentItem?.content && (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={contentItem.content}
              onSave={onSave}
              isLoading={isLoading}
            />
          </EditForm>
        )}

        {!editMode && contentItem?.content && (
          <animated.div style={fadeInPt1}>
            <PromoTitleWrapper>
              <>
                {children ? (
                  children
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: contentItem?.content,
                    }}
                  />
                )}
              </>
            </PromoTitleWrapper>
          </animated.div>
        )}

        {promos.length > 0 && (
          <Promos
            animate={animate}
            transparent
            delay={defaultDelay * 4}
            editMode={editMode}
            promos={promos}
            setPromos={setPromos}
            noFlexGrow
            sliderMode={sliderMode}
          />
        )}
      </PromoWrapper>
      {showFooter && (
        <PromoFooter>
          <p>9172 East K Ave, Galesburg MI, 49053</p>
          <ul>
            <li>
              <a
                target="_blank"
                href="https://www.facebook.com/gillettekennels1/"
              >
                <FacebookOutlined />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.instagram.com/gillettekennels/"
              >
                <InstagramOutlined />
              </a>
            </li>
          </ul>
        </PromoFooter>
      )}
    </>
  );
};
