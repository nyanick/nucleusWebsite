import axios from 'axios';
import {appRoutes} from "../constants";
import {validateToken} from "../utils/Utils";
import {deleteCookie, currentAuthToken, AUTH_TOKEN_KEY} from "../contexts/auth-reducer";

const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-type": "application/json"
    }
});

http.interceptors.request.use(request => {
    const authToken = currentAuthToken()
    if (authToken != null) {
        if (validateToken(authToken)) {
            request.headers = {
                ...request.headers,
                Authorization: `Bearer ${authToken}`
            }
        } else {
            deleteCookie(AUTH_TOKEN_KEY)
            const next = window.location.pathname
            window.location.href = `${appRoutes.ROUTE_LOGIN}?next=${next}`
        }
    } else {
        if (!window.location.pathname.includes(appRoutes.ROUTE_LOGIN)) {
            const next = window.location.pathname
            if (next !== appRoutes.ROUTE_LOGIN) {
                window.location.href = `${appRoutes.ROUTE_LOGIN}?next=${next}`
            }
        }
    }
    return request
})

http.interceptors.response.use(
    res => res,
    error => {
        if (error?.response?.status === 401) {
            deleteCookie(AUTH_TOKEN_KEY)
            const next = window.location.pathname
            if (next !== appRoutes.ROUTE_LOGIN) {
                window.location.href = `${appRoutes.ROUTE_LOGIN}?next=${next}`
            }
        }
        return Promise.reject(error)
    }
)
export default http