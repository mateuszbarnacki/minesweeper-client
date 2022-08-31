import axios from "axios";
import { config } from "./constants";

const request = {
    get: (path: string) => {
        return axios.get(path, config);
    },
    post: (path: string, data: any) => {
        return axios.post(path, data, config);
    },
    put: (path: string, data: any) => {
        return axios.put(path, data, config);
    },
    patch: (path: string, data: any) => {
        return axios.patch(path, data, config);
    },
    delete: (path: string) => {
        return axios.delete(path, config);
    },
};

export default request;