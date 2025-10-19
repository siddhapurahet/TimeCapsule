import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:10000' });
// const API = axios.create({ baseURL: 'https://timecapsule-server.onrender.com' })
// const url = 'https://timecapsule-server.onrender.com/posts';

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);   
export const fetchPostBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const getOnlineUsers = () => API.get('/user/online');
export const updateUserActivity = (userId) => API.post('/user/activity', { userId });
export const logout = (userId) => API.post('/user/logout', { userId });

