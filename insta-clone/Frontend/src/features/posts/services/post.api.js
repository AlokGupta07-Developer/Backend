import  axios  from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

export async function getFeed() {
    const response = await api.get("/posts/feed") 
    console.log("Feed Response:",response.data)
    return response.data
    
}

export async function createPost(imageFile, caption) {

    const formData = new FormData()

    formData.append("image", imageFile)
    formData.append("caption", caption)

    const response = await api.post("/posts/", formData)

    return response.data
}


export async function likePost(postId) {
  const response = await api.post(`/posts/like/${postId}`);
  return response.data;
}

export async function disLikePost(postId) {
  const response = await api.post(`/posts/disLike/${postId}`);
  return response.data;
}

export async function followUser(userName) {
  const response = await api.post(`/follow/${userName}`)
  return response.data
}

export async function unfollowUser(userName) {
  const response = await api.post(`/unFollow/${userName}`) 
  return response.data
}
