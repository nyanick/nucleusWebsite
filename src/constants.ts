const appRoutes = {
    ROUTE_HOME: '/',
    ROUTE_ADMINS: '/admins',
    ROUTE_USERS: '/users',
    ROUTE_SPECIALITIES: '/specialities',
    ROUTE_PATIENTS: '/patients',
    ROUTE_NURSES: '/nurses',
    ROUTE_ANALYSTS: '/analysts',
    ROUTE_DOCTORS: '/doctors',
    ROUTE_LOGIN: '/login',
    ROUTE_NOT_FOUND: '/_error',
}
const apiRoutes = {
    GET_PATIENTS: '/patients',
    GET_ADMINS: '/users/admins',
    USERS: '/user-consultation',
    PATIENTS: '/patients',
    DOCTORS: '/doctors',
    NURSES: '/nurses',
    CONSULTATIONS: '/consultations',
    MEDICAL_CARES: '/medical-cares',
    OBSERVATIONS: '/consultations/observations',
    HOSPITALS: '/hospitals',
    DIAGNOSIS: '/consultations/diagnosis',
    SYMPTOMS: '/consultations/symptoms',
    PRESCRIPTIONS: '/consultations/prescriptions',
    GET_ANALYSTS: '/analysts',
    GET_DOCTORS: '/doctors',
    GET_NURSES: '/nurses',
    GET_SPECIALITIES: '/specialities',
    GET_AUTHORITIES: '/users/authorities',
    GET_CURRENT_USER: '/users/account',
    GET_DOCTOR: (id) => `/doctors/${id}`,
    GET_PATIENT: (id) => `/patients/${id}`,
    GET_OBSERVATION: (id) => `/observations/${id}`,
    GET_NURSE: (id) => `/nurses/${id}`,
    GET_ANALYST: (id) => `/analysts/${id}`,
    GET_USER: (id) => `/users/${id}`,
    LOGIN: '/users/login',
    GET_USER_AVATAR: (uuid) => `${process.env.NEXT_PUBLIC_API_URL}/files/${uuid}`,
    MEDICAL_CARES_LIST: '/medical-cares-list',
}
const userRoles = {
    ROLE_PATIENT: 'ROLE_PATIENT',
    ROLE_NURSE: 'ROLE_NURSE',
    ROLE_ANALYST: 'ROLE_ANALYST',
    ROLE_DOCTOR: 'ROLE_DOCTOR',
    ROLE_ADMIN_HOPSITAL: 'ROLE_ADMIN_HOSPITAL',
}
export {appRoutes, apiRoutes, userRoles}