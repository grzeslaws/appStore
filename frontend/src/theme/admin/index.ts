import * as styledComponents from "styled-components";
import * as settings from "./settings/settings-project";

const { default: styled, css, injectGlobal, keyframes, ThemeProvider } = styledComponents as styledComponents.ThemedStyledComponentsModule<settings.ThemeAdmin>;

export default styled;
export { css, injectGlobal, keyframes, ThemeProvider };

export const themeAdmin = {
    colors: settings.colors,
    colorsPostStatus: settings.colorsPostStatus,
    spacing: settings.spacing,
    radius: settings.radius,
    fonts: settings.fonts,
    transitions: settings.transitions,
    paths: settings.paths,
};
