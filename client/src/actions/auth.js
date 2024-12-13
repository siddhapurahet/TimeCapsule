import { AUTH } from "../constants/actionTypes";
import * as api from '../api/index';

export const signin = (formData, Navigate) => async() => {
    try {
        Navigate('/');
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, Navigate) => async() => {
    try {
        Navigate('/');
    } catch (error) {
        console.log(error);
    }
};