import axios, { AxiosError, AxiosResponse } from 'axios';
import { BASE_URL, FRONTEND_ROUTES } from '../constants/Constants';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { message } from 'antd';

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

const axiosModule = axios.create();

axiosModule.interceptors.response.use(
    async (response) => response,
    ({ response, message: msg }: AxiosError) => {
        let errorMessage = '';
        if (msg === 'Network Error') {
            errorMessage = msg;
        }
        switch (response?.status) {
            case StatusCodes.INTERNAL_SERVER_ERROR:
                errorMessage = ReasonPhrases.INTERNAL_SERVER_ERROR;
                break;
            case StatusCodes.UNAUTHORIZED:
                errorMessage = ReasonPhrases.UNAUTHORIZED;
                window.location.href = FRONTEND_ROUTES.SIGNIN;
                break;
            default:
                break;
        }
        if (errorMessage !== '') {
            message.error(errorMessage);
        }

        return Promise.reject(msg);
    },
);

export default axiosModule;