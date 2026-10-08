import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export async function register(userName, email, password) {
    const response = await api.post("/register", {
        userName,
        email,
        password
    });
    return response.data;
}

export async function login(email, password) {
    const response = await api.post("/login",{
        email,
        password
    });
    return response.data
}
