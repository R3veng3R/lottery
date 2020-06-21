import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/backend'

export default axios.create({
    baseURL: BASE_URL
});