import { current } from "@reduxjs/toolkit";
import { FETCH_POST, FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from "../constants/actionTypes";

const posts = (state = {isLoading: true, posts: [], post: null}, action) => {
    switch(action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case END_LOADING:
            return {
                ...state,
                isLoading: false,
            };
        case FETCH_POST:
            return {
                ...state,
                post: action.payload,
                isLoading: false
            };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.page === 1 ? action.payload.data : [...state.posts, ...action.payload.data],
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload
            };
        case UPDATE:
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};
        case LIKE:
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};
        case CREATE:
            return {...state, posts: [action.payload, ...state.posts] };
        case DELETE:
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};
        default:
            return state;
    }
}

export default posts;