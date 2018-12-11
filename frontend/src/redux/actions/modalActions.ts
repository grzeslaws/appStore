import { ModalContent } from "../../model/ModalContent";
import { Action, ActionType } from "./action";

export const updateModal = (modal: ModalContent): Action<"UPDATE_MODAL", ModalContent> => {
    return {
        type: "UPDATE_MODAL",
        payload: modal,
    };
};

export const removeModalAction = (): Action<"REMOVE_MODAL", any> => {
    return {
        type: "REMOVE_MODAL",
    };
};

export const updateSubmitAction = (flag: boolean): Action<"UPDATE_SUBMIT", boolean> => {
    return {
        type: "UPDATE_SUBMIT",
        payload: flag,
    };
};

export const showModal = (modal: ModalContent) => {
    return dispatch => {
        dispatch(updateModal(modal));
    };
};

export const removeModal = () => dispatch => dispatch(removeModalAction());
export const updateSubmit = (flag: boolean) => dispatch => dispatch(updateSubmitAction(flag));
