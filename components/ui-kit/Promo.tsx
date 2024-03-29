import React, { useContext, useState } from "react";
import { animated, config, useSpring } from "react-spring";
import { ThemePreferenceContext } from "../../pages/_app";
import { saveContent } from "../Admin/services";
import { EditForm } from "../Forms/styles";
import { Promos } from "./Promo/Promos";
import { PromoWrapper, PromoTitleWrapper } from "./Promo/styles-promo";
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
  showFooter = null,
  animate = true,
  contentItem = null,
  setContentItem = undefined,
  sliderMode = false,
  bannerMode = false,
}) => {
  const { currentTheme, editMode } = useContext(ThemePreferenceContext);
  const [isLoading, setIsLoading] = useState(false);

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

  const onSave = (html) => {
    setIsLoading(true);
    saveContent({
      apiPath: `/api/content-item/${contentItem.id}`,
      payload: { content: html },
    })
      .then(() => {
        setIsLoading(false);
        setContentItem({ content: html });
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <>
      <PromoWrapper currentTheme={currentTheme} bannerMode={bannerMode}>
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
          <animated.div
            style={{
              ...fadeInPt1,
              alignSelf: "center",
            }}
          >
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
            bannerMode={bannerMode}
          />
        )}
      </PromoWrapper>
      {showFooter && <>{showFooter}</>}
    </>
  );
};
