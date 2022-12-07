import {IUser} from "../types/user";
import Cookies from 'js-cookie'
import {IHospital} from "../types/hospital";

export const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY'
export const CURRENT_HOSPITAL = 'CURRENT_HOSPITAL'
export const currentAuthToken = () => Cookies.get(AUTH_TOKEN_KEY) || null
export const deleteCookie = (cookieName: string) => Cookies.remove(cookieName)
export const initialState = {
    authToken: typeof window !== 'undefined' ? Cookies.get(AUTH_TOKEN_KEY) || null : null,
    authUser: null,
    currentHospital: typeof window !== 'undefined' ? Cookies.get(CURRENT_HOSPITAL) || null : null,
    hospitalSetup: typeof window !== 'undefined' ? Cookies.get('SETUP_HOSPITAL') || false : false
}

export interface StorePayload {
    storeAction: StoreAction
    storeToken?: string
    storeUser?: IUser,
    currentHospital?: string,
    hospitalSetup?: boolean
}

export type StoreAction = 'LOGIN' | 'LOGOUT' | 'AUTH_USER' | 'CURRENT_HOSPITAL' | 'SETUP_HOSPITAL'

const reducer = (state, action: StorePayload) => {
    switch (action.storeAction) {
        case 'LOGIN':
            const authToken = action.storeToken
            Cookies.set(AUTH_TOKEN_KEY, authToken)
            return {
                ...state,
                authToken: authToken
            }
        case 'AUTH_USER':
            const authUser = action.storeUser
            return {
                ...state,
                authUser: authUser
            }
        case 'CURRENT_HOSPITAL':
            const currentHospital = action.currentHospital
            Cookies.set(CURRENT_HOSPITAL, currentHospital)
            return {
                ...state,
                currentHospital
            }
        case 'SETUP_HOSPITAL':
            Cookies.set('SETUP_HOSPITAL', action.hospitalSetup)
            return {
                ...state,
                hospitalSetup: action.hospitalSetup
            }
        case 'LOGOUT':
            deleteCookie(AUTH_TOKEN_KEY)
            deleteCookie(CURRENT_HOSPITAL)
            deleteCookie('SETUP_HOSPITAL')
            return {
                ...state,
                authToken: null,
                authUser: null,
                currentHospital: null,
                hospitalSetup: false,
            }
        default:
            return state
    }
}
export default reducer