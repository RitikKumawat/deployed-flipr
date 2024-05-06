const BASE_URL = "https://backend-qllu.onrender.com/api"

export const authEndpoints = {
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login"
}

export const adminEndpoints={
    CREATE_INSTANCE: BASE_URL + "/admin/create-instance",
    CREATE_DATABASE: BASE_URL + "/admin/create-database",
    GET_INSTANCE: BASE_URL + "/admin/get-instances",
    REMOVE_DATABASE: BASE_URL + "/admin/remove-database",
    PUSH_DATABASE: BASE_URL + "/admin/push-database",
    ASSIGN_ROLE: BASE_URL + "/admin/assign-role",
    CHANGE_PASSWORD: BASE_URL + "/admin/change-password",
    REMOVE_USER: BASE_URL + "/admin/remove-user",
    REMOVE_USER_ACCESS: BASE_URL + "/admin/remove-access",
    ADD_USER: BASE_URL + "/admin/add-user",
    CREATE_USER:BASE_URL + "/admin/create-user",
    FETCH_DATABASE:BASE_URL + "/admin/fetch-databases"
}