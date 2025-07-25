import axios from "axios";
import Services from "./services";

const Api = (auth = true, options: any = {}) => {
    const headers: any = options?.headers || {};

    if (!headers["Content-Type"]) {
        headers["Content-Type"] = `application/json`;
    }

    if (auth && !headers?.Authorization) {


        const storageToken = Services.getStorageToken();
        headers.Authorization = `Bearer ${storageToken?.token}`;

    }

    options.headers = headers;

    return axios.create({
        baseURL: import.meta.env.VITE_API,
        headers,
    });
};

export const fetcher = (url: string, auth = true) =>
    Api(auth)
        .get(url)
        .then((res) => res);

export default Api;
