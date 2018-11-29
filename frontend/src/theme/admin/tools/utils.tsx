import { ColorPostStatus } from "../../../model/PostStatus";
import { StatusOrderEnum } from "../../../redux/actions/orderActions";
import { transitions } from "../settings/settings-project";

const placeholder = (color: string, fontWeight: number, fontFamily: string, fontSize = "14px") => {
    return `
    ::-webkit-input-placeholder {
        color: ${color};
        font-style: italic;
        font-weight: ${fontWeight};
        font-family: ${fontFamily};
        font-size: ${fontSize};
    }
    ::-moz-placeholder {
        color: ${color};
        font-style: italic;
        font-weight: ${fontWeight};
        font-family: ${fontFamily};
        font-size: ${fontSize};
    }
    :-ms-input-placeholder {
        color: ${color};
        font-style: italic;
        font-weight: ${fontWeight};
        font-family: ${fontFamily};
        font-size: ${fontSize};
    }
    :-moz-placeholder {
        color: ${color};
        font-style: italic;
        font-weight: ${fontWeight};
        font-family: ${fontFamily};
        font-size: ${fontSize};
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

const postsStatusColor = props => {
    if (props.color === ColorPostStatus.BLUE) {
        return props.theme.colorsPostStatus.blue;
    } else if (props.color === ColorPostStatus.GRAY) {
        return props.theme.colorsPostStatus.gray;
    } else if (props.color === ColorPostStatus.GREEN) {
        return props.theme.colorsPostStatus.green;
    } else {
        return props.theme.colorsPostStatus.red;
    }
};

const statusColor = props => {
    if (props.status === StatusOrderEnum.canceled) {
        return props.theme.colors.colorAlert;
    } else if (props.status === StatusOrderEnum.completed) {
        return props.theme.colors.colorSuccess();
    } else if (props.status === StatusOrderEnum.pending) {
        return props.theme.colors.colorPrimary();
    } else if (props.status === StatusOrderEnum.rejected) {
        return props.theme.colors.colorAlert;
    } else {
        return props.theme.colors.colorGray();
    }
};

export { placeholder, hoverOpacity, postsStatusColor, statusColor };
