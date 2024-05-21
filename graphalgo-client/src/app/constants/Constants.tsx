export const FRONTEND_ROUTES = {
    CALCULATOR: '/calculator',
    SIGNUP: '/signup',
    SIGNIN: '/signin',
    HISTORY: '/history',
    RESET_PASSWORD: '/reset-password',
    SEND_EMAIL: "/send-reset-password"
};

export const BASE_URL = "http://localhost:8080/";

export const AUTH_ENDPOINTS = {
    GET_USER: 'auth/user',
    SIGNUP: 'auth/signup',
    SIGNIN: 'auth/signin',
    REFRESH_TOKEN: 'auth/refresh',
    LOGOUT: 'auth/logout',
    RESET_PASSWORD: 'auth/reset-password',
    SEND_EMAIL: "email/send"
};

export const GRAPH_ENDPOINTS = {
    BFS: 'graph/bfs/',
    DFS: 'graph/dfs/',
    DIJKSTRA: 'graph/dijkstra/',
    PRIM: 'graph/prim',
    KRUSKAL: 'graph/kruskal',
    HISTORY: '/history'
}

export const INVALID_INPUT_MESSAGE = "Невалідні дані";