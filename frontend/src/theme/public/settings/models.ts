export interface Colors {
    colorAlert: string;
    colorLight: string;
    colorSecondary: string;
    colorSuccess: string;
    colorPrimary: (opacity?: number) => string;
    colorWhite: string;
    colorGray: (opacity?: number) => string;
    colorGrayLight: (opacity?: number) => string;
    colorBlack: string;
}

export interface Spacing {
    defaultSpacing: (n?: number) => string;
}

export interface Radius {
    defaultRadius: string;
    ovalRadius: string;
    smallRadius: string;
}

export interface Fonts {
    fontFamilyDefault: string;
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    fontLight: number;
    fontMedium: number;
    fontBold: number;
    small: string;
}

export interface Transitions {
    transitionDefault: string;
}

export interface Paths {
    imagePath: (imagePath: string) => string;
}

export default interface ThemeAdmin {
    colors: Colors;
    spacing: Spacing;
    radius: Radius;
    fonts: Fonts;
    transitions: Transitions;
    paths: Paths;
}
