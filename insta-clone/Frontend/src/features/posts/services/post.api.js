import  axios  from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/api/posts",
    withCredentials: true
})

export async function getFeed() {
    const response = await api.get("/feed") 
    console.log("Feed Response:",response.data)
    return response.data
    
}
