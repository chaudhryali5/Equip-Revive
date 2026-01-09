export const BASE_URL = import.meta.env.VITE_BACKEND_URL

export const ADD_SERVICE = BASE_URL + "/api/v1/addService"
export const LIST_SERVICE = BASE_URL + "/api/v1/listServices"
export const ORDER_URI = BASE_URL + "/api/v1/orders"
export const DELETE_SERVICE = BASE_URL + "/api/v1/removeService/:id"
export const UPDATE_STATUS=BASE_URL+"/api/v1/update-status/:id"
export const USER_ORDER=BASE_URL+"/api/v1/order-list"
export const ADMIN_LOGIN_URL = BASE_URL + "/api/v1/admin";