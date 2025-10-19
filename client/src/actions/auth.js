import { AUTH } from "../constants/actionTypes";
import * as api from '../api/index';
// import { Redirect } from "react-router-dom/cjs/react-router-dom";

export const signin = (formData, Navigate, setError) => async(dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data});
        Navigate.push('/');

    } catch (error) {
        console.log(error);
        if (error.response?.data?.message) {
            setError(error.response.data.message);
        } else {
            setError('Incorrect username or password');
        }
    }
};

export const signup = (formData, Navigate, setError) => async(dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data});
        Navigate.push('/');

    } catch (error) {
        console.log(error);
        if (error.response?.data?.message) {
            setError(error.response.data.message);
        } else {
            setError('Something went wrong. Please try again.');
        }
    }
};