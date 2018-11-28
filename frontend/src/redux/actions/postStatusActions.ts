import { parse, parseArray } from "sparkson";
import endpoints from "../../endpoints";
import http from "../../http";
import { PostStatus } from "./../../model/PostStatus";
import { Action } from "./action";

const updatePostStatusAction = (postStatuses: PostStatus[]): Action<"UPDATE_POST_STATUS", PostStatus[]> => {
    return {
        type: "UPDATE_POST_STATUS",
        payload: postStatuses,
    };
};

export const getPostStatuses = () => {
    return dispatch => {
        return http(endpoints.getPostStatuses, "get", {}).then(json => dispatch(updatePostStatusAction(parseArray(PostStatus, json))));
    };
};

export const addPostStatus = (postStatus: PostStatus) => {
    return dispatch => {
        return http(endpoints.addPostStatus, "post", { name: postStatus.name, color: postStatus.color }).then(() => dispatch(getPostStatuses()));
    };
};

export const removePostStatus = (postStatusId: number) => {
    return dispatch => {
        return http(endpoints.deletePostStatus(postStatusId), "get", {}).then(() => dispatch(getPostStatuses()));
    };
};
