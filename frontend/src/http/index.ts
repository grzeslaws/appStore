import { requestCompleted, requestIssued } from "../redux/actions/fetchActions";
import store from "../redux/store/store";

const DEFAULT_OPTIONS = {
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
};

const CONTENT_TYPE_HEADER = "Content-Type";
const APPLICATION_JSON = "application/json";

const http = (endpoint, method = "get", options?) => {
    let body = {};
    let params = "";
    let defaultOptions = { ...DEFAULT_OPTIONS };

    if (options) {
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
            },
        );
    });
};

export default http;
