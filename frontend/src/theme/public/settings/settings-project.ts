const colors = {
    colorAlert: (opacity = 1) => `rgba(255, 75, 48, ${opacity})`,
    colorSecondary: (opacity = 1) => `rgba(255, 130, 0, ${opacity})`,
    colorSuccess: (opacity = 1) => `rgba(0, 199, 156, ${opacity})`,
    colorPrimary: (opacity = 1) => `rgba(0, 144, 163, ${opacity})`,
    colorWhite: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    colorGray: (opacity = 1) => `rgba(82, 86, 94, ${opacity})`,
    colorGrayLight: (opacity = 1) => `rgba(232, 237, 242, ${opacity})`,
    colorBlack: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const spacing = {
    defaultSpacing: (n = 1) => `${10 * n}px`,
};

const radius = {
    defaultRadius: "5px",
    ovalRadius: "50px",
    smallRadius: "3px",
};

const fonts = {
    fontFamilyDefault: "Open Sans, serif",
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

const transitions = {
    transitionDefault: "300ms ease",
};

const paths = {
    imagePath: (path: string) => `/static/${path}`,
};

export { colors, spacing, radius, fonts, transitions, paths };

export interface ThemePublic {
    colors: typeof colors;
    spacing: typeof spacing;
    radius: typeof radius;
    fonts: typeof fonts;
    transitions: typeof transitions;
    paths: typeof paths;
}
