import { StatusOrder } from "../redux/actions/orderActions";

export const renderStatus = (status: string) => {
    const s: string = status ? status : StatusOrder.undefined;
    return s.toLocaleLowerCase();
};
