import axios from 'axios'
const { REACT_APP_API_ENDPOINT } = process.env
const API_ENDPOINT = REACT_APP_API_ENDPOINT;

const authPaths = [
    '/login',
    '/register',
    '/forgot-password',
    '/new-password',
]

const apiHelper = async function (method: any, path: string, body: any) {
    const config = {
        method: method,
        withCredentials: true,
        url: path,
        data: {
            ...body,
        },
        headers: {
            'Content-Type': 'application/json',
        },
    }

    try {
        const res = await axios(API_ENDPOINT + path, config);
        console.log(API_ENDPOINT + path,"res");
        return res;
    } catch (error: any) {
        if ((error.response.status === 401 || error.response.status === 403)
            && !authPaths.includes(window.location.pathname)) {
            window.location.href = '/login';
            localStorage.clear();
            return error.response;
        }
        return error.response;
    }
}

export default apiHelper;