import { transitions } from "../settings/settings-project";

const placeholder = (color: string, fontWeight: number, fontFamily: string) => {
    return `
    ::-webkit-input-placeholder {
        color: ${color};
        font-style: italic;
        font-weight: ${fontWeight};
        font-family: ${fontFamily};
    }
    ::-moz-placeholder {
        color: ${color};
        font-style: italic;
        font-weight: ${fontWeight};
        font-family: ${fontFamily};
    }
    :-ms-input-placeholder {
        color: ${color};
        font-style: italic;
        font-weight: ${fontWeight};
        font-family: ${fontFamily};
    }
    :-moz-placeholder {
        color: ${color};
        font-style: italic;
        font-weight: ${fontWeight};
        font-family: ${fontFamily};
    }`;
};

const hoverOpacity = () => {
    return `
        transition: ${transitions.transitionDefault};

        &:hover {
            opacity: 0.8;
        }
    `;
};

export { placeholder, hoverOpacity };
