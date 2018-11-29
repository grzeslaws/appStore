import { StatusOrderEnum } from "../redux/actions/orderActions";

export const renderStatus = (status: string) => {
    const s: string = status ? status : StatusOrderEnum.undefined;
    return s.toLocaleLowerCase();
};
