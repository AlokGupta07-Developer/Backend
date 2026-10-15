import { useContext, useEffect } from "react";
import { PostContext } from "../PostContext.jsx";
import {
  getFeed,
  createPost,
  likePost,
  disLikePost,
} from "../services/post.api.js";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, post, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts);
    setLoading(false);
  };

  const handleCreatePost = async (imageFile, caption) => {
    try {
      setLoading(true);

      const data = await createPost(imageFile, caption);

      if (!data?.post) {
        throw new Error("Created post was not returned by the API");
      }

      setFeed((prevFeed) => [data.post, ...prevFeed]);
    } catch (error) {
      console.error(
        "Post create failed:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };
  const handleLike = async (postId) => {
    try {
      await likePost(postId);

      setFeed((prevFeed) =>
        prevFeed.map((post) =>
          post._id === postId ? { ...post, isLiked: true } : post,
        ),
      );
    } catch (error) {
      console.error("Like failed:", error.response?.data || error.message);
    }
  };

  const handleDisLike = async (postId) => {
    try {
      await disLikePost(postId);

      setFeed((prevFeed) =>
        prevFeed.map((post) =>
          post._id === postId ? { ...post, isLiked: false } : post,
        ),
      );
    } catch (error) {
      console.error("Dislike failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    handleGetFeed();
  }, []);

  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handleCreatePost,
    handleLike,
    handleDisLike,
  };
};
