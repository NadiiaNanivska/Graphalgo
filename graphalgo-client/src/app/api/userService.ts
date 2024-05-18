import { AUTH_ENDPOINTS } from "../constants/Constants";
import { LoginRequest, RegisterRequest, User } from "../dto/authDTOs";
import axiosModule from "./baseService";

export const register = async (registerDto: RegisterRequest): Promise<void> => {
    try {
        await axiosModule.post(AUTH_ENDPOINTS.SIGNUP, registerDto);
    } catch (error) {
        throw new Error('Не вдалось зареєструвати');
    }
};

export const login = async (loginDto: LoginRequest): Promise<User> => {
    try {
        const response = await axiosModule.post(AUTH_ENDPOINTS.SIGNIN, loginDto);
        return response.data;
    } catch (error) {
        throw new Error('Не вдалось увійти');
    }
};

export const getUser = async (): Promise<User> => {
    try {
        const response = await axiosModule.get(AUTH_ENDPOINTS.GET_USER);
        return response.data;
    } catch (error) {
        throw new Error('Користувача не знайдено');
    }
};


export const logout = async (): Promise<void> => {
    try {
        await axiosModule.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
        throw new Error('Не вдалось вийти');
    }
};