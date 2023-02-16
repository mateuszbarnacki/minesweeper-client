import axios from "axios";
import {config} from "./constants";

const request = {
    get: (path: string) => {
        return axios.get(path, config);
    },
    post: (path: string, data: any) => {
        return axios.post(path, data, config);
    }
}

export default request;