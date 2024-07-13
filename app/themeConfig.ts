import config from "@/tailwind.config";
import { dancing_script, lato } from "@/app/fonts";

export const antThemeConfig = {
  cssVar: true,
  hashed: false,
  token: {},
  components: {
    Input: {
      colorBgContainer: `rgb(${config.theme?.tokens.colors.white})`,
      colorText: `rgb(${config.theme?.tokens.colors.primary})`,
      colorTextPlaceholder: `rgba(${config.theme?.tokens.colors.black}, 0.5)`,
    },
    Notification: {
      colorBgContainer: `rgb(${config.theme?.tokens.colors.white})`,
      colorBgBase: `rgb(${config.theme?.tokens.colors.white})`,
      colorText: `rgb(${config.theme?.tokens.colors.primary})`,
      colorTextHeading: `rgb(${config.theme?.tokens.colors.primary})`,
      colorTextBase: `rgb(${config.theme?.tokens.colors.primary}) `,
      colorIcon: `rgba(${config.theme?.tokens.colors.primary}, 0.5)`,
      colorIconHover: `rgb(${config.theme?.tokens.colors.primary})`,
    },
    Drawer: {
      colorIcon: `rgba(${config.theme?.tokens.colors.white}, 0.5)`,
      colorIconHover: `rgb(${config.theme?.tokens.colors.white})`,
      colorBgElevated: `rgb(${config.theme?.tokens.colors.primary})`,
    },
    Alert: {
      colorTextHeading: `rgb(${config.theme?.tokens.colors.black})`,
      colorTextBase: `rgb(${config.theme?.tokens.colors.primary}) `,
    },
    Message: {
      colorText: `rgb(${config.theme?.tokens.colors.black})`,
    },
    Tabs: {
      colorText: `rgb(${config.theme?.tokens.colors.black})`,
      colorTextActive: `rgb(${config.theme?.tokens.colors.black})`,
      colorTextHover: `rgb(${config.theme?.tokens.colors.black})`,
      colorTextDisabled: `rgba(${config.theme?.tokens.colors.black}, 0.5)`,
      colorTextHeading: `rgb(${config.theme?.tokens.colors.black})`,
      colorTextBase: `rgb(${config.theme?.tokens.colors.black})`,
      colorBgContainer: `rgb(${config.theme?.tokens.colors.white})`,
      colorBgBase: `rgb(${config.theme?.tokens.colors.white})`,
      colorBgHover: `rgb(${config.theme?.tokens.colors.white})`,
      colorBgActive: `rgb(${config.theme?.tokens.colors.white})`,
      colorBgDisabled: `rgba(${config.theme?.tokens.colors.white}, 0.5)`,
      colorBorder: `rgb(${config.theme?.tokens.colors.black})`,
    },
    Statistic: {
      colorTextBase: `rgb(${config.theme?.tokens.colors.white})`,
    },
    Tag: {
      colorText: `rgb(${config.theme?.tokens.colors.black})`,
      colorBgContainer: `rgb(${config.theme?.tokens.colors.white})`,
      colorBorder: `rgb(${config.theme?.tokens.colors.primary})`,
    },
    Collapse: {
      colorText: `rgb(${config.theme?.tokens.colors.black})`,
      colorBgContainer: `rgb(${config.theme?.tokens.colors.white})`,
    },
  },
};
