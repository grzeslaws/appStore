import { Colors, Fonts, Paths, Radius, Spacing, Transitions } from "./models";

const colors: Colors = {
    colorAlert: "#E85D75",
    colorLight: "#c3e7f0",
    colorSecondary: "#f1ee78",
    colorSuccess: "#00B771",
    colorPrimary: (opacity = 1) => `rgba(157, 105, 163, ${opacity})`,
    colorWhite: "#fff",
    colorGray: (opacity = 1) => `rgba(255, 172, 189, ${opacity})`,
    colorGrayLight: (opacity = 1) => `rgba(232, 237, 242, ${opacity})`,
    colorBlack: "#3c4859",
};

const spacing: Spacing = {
    defaultSpacing: (n = 1) => `${10 * n}px`,
};

const radius: Radius = {
    defaultRadius: "5px",
    ovalRadius: "50px",
    smallRadius: "3px",
};

const fonts: Fonts = {
    fontFamilyDefault: '"Roboto Slab", serif',
    h1: "32px",
    h2: "26px",
    h3: "18px",
    h4: "14px",
    h5: "13px",
    small: "12px",
    fontLight: 300,
    fontMedium: 400,
    fontBold: 700,
};

const transitions: Transitions = {
    transitionDefault: "300ms ease",
};

const paths: Paths = {
    imagePath: (path: string) => `/static/${path}`,
};

export { colors, spacing, radius, fonts, transitions, paths };
