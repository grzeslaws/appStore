import { Colors, Fonts, Radius, Spacing, Transitions } from "./models";

const colors: Colors = {
    colorAlert: "#E85D75",
    colorLight: "#c3e7f0",
    colorSecondary: "#f1ee78",
    colorSuccess: "#40F99B",
    colorPrimary: "#9D69A3",
    colorWhite: "#fff",
    colorGray: "#9facbd",
    colorGrayLight: "#e8edf2",
    colorBlack: "#3c4859",
};

const spacing: Spacing = {
    defaultSpacing: (n: number) => `${10 * n}px`,
};

const radius: Radius = {
    defaultRadius: "5px",
    ovalRadius: "50px",
};

const fonts: Fonts = {
    fontFamilyDefault: '"Roboto Slab", serif',
    h1: "32px",
    h2: "26px",
    h3: "18px",
    h4: "14px",
    small: "12px",
    fontLight: 300,
    fontMedium: 400,
    fontBold: 700,
};

const transitions: Transitions = {
    transitionDefault: "all 300ms ease",
};

export { colors, spacing, radius, fonts, transitions };
