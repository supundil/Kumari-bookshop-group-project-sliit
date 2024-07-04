import axios from "axios";
import {useNavigate} from 'react-router-dom';

const HttpMethods = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
};

const _axios = axios.create();
const baseUrl = process.env.REACT_APP_BASE_API_URL;
const restVersionPath = process.env.REACT_APP_API_VERSION_PATH;

export function useNavigation() {
    return useNavigate();
}

function configure (authDto, setAuthDto, window) {
    _axios.interceptors.request.use(function (config) {
        if (null != authDto.token && 'true' === config.headers.get('require-token')) {
            config.headers.set("Authorization", `Bearer ${authDto.token}`);
        }
        return config;
    });

    _axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response.status === 401 || error.response.status === 403) {
                useNavigation()('/');
            }

            return Promise.reject(error);
        }
    );

}

const get = (path = "",  config) => {
    let url = baseUrl + restVersionPath + path;
    return _axios.get(url, config);
}

const put = (path = "", payload, config) => {
    let url = baseUrl + restVersionPath + path;
    return _axios.put(url, payload, config);
}

const post = (path = "", payload, config) => {
    let url = baseUrl + restVersionPath + path;
    return _axios.post(url, payload, config);
}


const deleteOne = (path = "", config) => {
    let url = baseUrl + restVersionPath + path;
    return _axios.delete(url, config);
}

const getAxios = () => {
    return axios;
}

const getAxiosClient = () => _axios;

const HttpService = {
    HttpMethods,
    configure,
    getAxiosClient,
    get,
    put,
    post,
    deleteOne,
    getAxios
};


export default HttpService;
