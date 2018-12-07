import { requestCompleted, requestFailed, requestIssued } from "../redux/actions/fetchActions";
import store from "../redux/store/store";

const CONTENT_TYPE_HEADER = "Content-Type";
const APPLICATION_JSON = "application/json";
let defaultOptions;

const http = (endpoint, method = "get", options?) => {
    let body = {};
    let params = "";
    // application/x-www-form-urlencoded

    if (options) {
        const DEFAULT_OPTIONS = {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("x-access-token"),
            },
        };

        defaultOptions = { ...DEFAULT_OPTIONS };
        switch (method) {
            case "get":
                const esc = encodeURIComponent;
                params += Object.keys(options)
                    .map(k => esc(k) + "=" + esc(typeof options[k] !== "undefined" ? options[k] : ""))
                    .join("&");

                break;
            case "file":
                const formData = new FormData();
                Array.from(options).forEach(file => {
                    formData.append("file", file as File);
                });
                defaultOptions = null;
                body = {
                    body: formData,
                };
                method = "post";
                break;
            default:
                body = {
                    body: JSON.stringify(options),
                };
                break;
        }
    }

    return new Promise((resolve, reject) => {
        store.dispatch(requestIssued());
        fetch(endpoint + (params ? "?" + params : ""), { credentials: "same-origin", ...defaultOptions, ...{ method }, ...body }).then(
            response => {
                if (response.ok) {
                    store.dispatch(requestCompleted());
                    if (options && options === "text") {
                        resolve(response.text());
                    } else {
                        if (response.headers.get(CONTENT_TYPE_HEADER)) {
                            resolve(response.json());
                        } else {
                            resolve();
                        }
                    }
                } else {
                    store.dispatch(requestFailed("Error", "Error"));
                    console.log("err");

                    const contentType = response.headers.get(CONTENT_TYPE_HEADER);
                    if (contentType && contentType.includes(APPLICATION_JSON)) {
                        reject(response.json());
                    } else {
                        reject();
                    }
                }
            },
            error => {
                // network errors
                reject(new Error("Network error"));
                store.dispatch(requestFailed("Network error", "Network error"));
            },
        );
    });
};

export default http;
