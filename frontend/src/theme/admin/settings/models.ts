export interface Colors {
    colorAlert: string;
    colorLight: string;
    colorSecondary: string;
    colorSuccess: string;
    colorPrimary: string;
    colorWhite: string;
    colorGray: string;
    colorGrayLight: string;
    colorBlack: string;
}

export interface Spacing {
    defaultSpacing: (n: number) => string;
}

export interface Radius {
    defaultRadius: string;
    ovalRadius: string;
}

export interface Fonts {
    fontFamilyDefault: string;
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    fontLight: number;
    fontMedium: number;
    fontBold: number;
    small: string;
}

export interface Transitions {
    transitionDefault: string;
}

export default interface ThemeAdmin {
    colors: Colors;
    spacing: Spacing;
    radius: Radius;
    fonts: Fonts;
    transitions: Transitions;
}
