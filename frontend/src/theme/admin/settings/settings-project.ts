const colors = {
    colorAlert: "#E85D75",
    colorLight: "#c3e7f0",
    colorSecondary: "#f1ee78",
    colorSuccess: (opacity = 1) => `rgba(0, 183, 113, ${opacity})`,
    colorPrimary: (opacity = 1) => `rgba(157, 105, 163, ${opacity})`,
    colorWhite: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    colorGray: (opacity = 1) => `rgba(159, 172, 189, ${opacity})`,
    colorGrayLight: (opacity = 1) => `rgba(232, 237, 242, ${opacity})`,
    colorBlack: (opacity = 1) => `rgba(60, 72, 89, ${opacity})`,
};

const colorsPostStatus = {
    red: colors.colorAlert,
    blue: "#1a73e8",
    green: colors.colorSuccess(),
    gray: colors.colorGray(),
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

const transitions = {
    transitionDefault: "300ms ease",
};

const paths = {
    imagePath: (path: string) => `/static/${path}`,
};

export { colors, spacing, radius, fonts, transitions, paths, colorsPostStatus };

export interface ThemeAdmin {
    colors: typeof colors;
    colorsPostStatus: typeof colorsPostStatus;
    spacing: typeof spacing;
    radius: typeof radius;
    fonts: typeof fonts;
    transitions: typeof transitions;
    paths: typeof paths;
}
