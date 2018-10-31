import * as styledComponents from "styled-components";
import AdminTheme from "./settings/models";
import * as settings from "./settings/settings-project";

const { default: styled, css, injectGlobal, keyframes, ThemeProvider } = styledComponents as styledComponents.ThemedStyledComponentsModule<AdminTheme>;

export default styled;
export { css, injectGlobal, keyframes, ThemeProvider };

export const themeAdmin = {
    colors: settings.colors,
    spacing: settings.spacing,
    radius: settings.radius,
    fonts: settings.fonts,
    transitions: settings.transitions,
};
